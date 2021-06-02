import { LogOutRequestDto } from '@auth/dots/logOutRequest.dto';
import { IUserRequest } from '@auth/interfaces/userRequest.interface';
import { DeviceService } from '@devices/services/device.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRegisterService } from '@user/services/user.register.service';
import * as bcrypt from 'bcrypt';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private _userService: UserRegisterService,
    private _tokenService: TokenService,
    private _deviceService: DeviceService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this._userService.findByEmail(email);

    if (user && (await bcrypt.compare(pass, user.password))) {
      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;
      delete user.email;

      return user;
    }

    return null;
  }

  async login({ userId }: IUserRequest) {
    return {
      access_token: await this._tokenService.generateAccessToken(userId),
      refresh_token: await this._tokenService.generateRefreshToken(userId),
    };
  }

  async logout({ fcm_token, refresh_token }: LogOutRequestDto): Promise<void> {
    try {
      await this._tokenService.deleteRefreshTokenFronCacheStorage(
        refresh_token,
      );
      await this._deviceService.updateStateFcmTokem(fcm_token);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
