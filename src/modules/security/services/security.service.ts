import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '@user/dtos/creationalDtos/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SecurityService {
  constructor(private _configService: ConfigService) {}

  async hashPassword(dto: CreateUserDto) {
    const { password: passwordToHash, ...newDto } = { ...dto };
    const salts = +this._configService.get<number>('SALTS');
    const password = await bcrypt.hash(passwordToHash, salts);
    return { password, ...newDto };
  }
}
