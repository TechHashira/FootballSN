import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/services';
import * as bcrypt from 'bcrypt';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private _userService: UserService,
    private _tokenService: TokenService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this._userService.findByEmail(email);

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, createdAt, updatedAt, email, ...result } = user;
      return result;
    }

    return null;
  }

  async login({ userId, roles }: any) {
    return {
      access_token: await this._tokenService.generateAccessToken(userId, roles),
      refresh_token: await this._tokenService.generateRefreshToken(
        userId,
        roles,
      ),
    };
  }
}
