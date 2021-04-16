import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { Role } from 'src/common/constants';
import { TokenExpiredError } from 'jsonwebtoken';
import { TokenExpiredException } from 'src/exceptions/tokenExpired.exception';
import { TokenMalformedException } from 'src/exceptions/tokenMalformed.exception';
import { RefreshTokenDto } from '../dots/refreshToken.dto';

@Injectable()
export class TokenService {
  constructor(
    private _jwtService: JwtService,
    @Inject(CACHE_MANAGER) private _cacheManager: Cache,
    private _configService: ConfigService,
  ) {}

  async generateAccessToken(userId: string, role: Role) {
    return await this._jwtService.signAsync(
      { sub: userId, role },
      { expiresIn: this._configService.get<string>('JWT_EXP_ACCESS_TOKEN') },
    );
  }

  async generateRefreshToken(userId: string, role: Role): Promise<string> {
    const payload = {
      is_revoked: false,
      sub: userId,
      role,
    };

    const token = await this._jwtService.signAsync(payload, {
      expiresIn: this._configService.get<string>('JWT_EXP_REFRESH_TOKEN'),
    });
    await this.addRefreshTokenToCacheStorage(token, userId);

    return token;
  }

  private async addRefreshTokenToCacheStorage(token: string, userId: string) {
    return await this._cacheManager.set(token, userId);
  }

  private async resolveRefreshToken(
    token: string,
  ): Promise<{ userIdFromClient: string; role: Role }> {
    const { sub: userIdFromClient, role } = await this.decodeRefreshToken(
      token,
    );

    const userIdFromCacheStorage = await this.getStoredToken(token);

    if (!userIdFromCacheStorage) {
      throw new UnprocessableEntityException('Refresh token not found');
    }

    if (userIdFromClient !== userIdFromCacheStorage) {
      throw new TokenMalformedException();
    }

    return { userIdFromClient, role };
  }

  private async getStoredToken(token: string) {
    return await this._cacheManager.get(token);
  }

  private async createAccessTokenFromRefreshToken(refreshToken: string) {
    const { userIdFromClient, role } = await this.resolveRefreshToken(
      refreshToken,
    );

    if (!userIdFromClient) {
      throw new TokenMalformedException();
    }

    const newAccessToken = await this.generateAccessToken(
      userIdFromClient,
      role,
    );

    return newAccessToken;
  }

  private async decodeRefreshToken(token: string) {
    try {
      return await this._jwtService.verifyAsync(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new TokenExpiredException();
      } else {
        throw new TokenMalformedException();
      }
    }
  }

  public async refresh(refreshTokenDto: RefreshTokenDto) {
    const { refresh_token } = refreshTokenDto;

    const newAccessToken = await this.createAccessTokenFromRefreshToken(
      refresh_token,
    );

    return { access_token: newAccessToken };
  }
}
