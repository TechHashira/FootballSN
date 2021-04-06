import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { IsEmailAlreadyExistsContraint } from './dtos';
import {
  UserAuthForgottenPasswordRepository,
  UserRepository,
} from './repositories';
import { UserService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      UserAuthForgottenPasswordRepository,
    ]),
  ],
  controllers: [UserController],
  exports: [UserService, IsEmailAlreadyExistsContraint],
  providers: [UserService, IsEmailAlreadyExistsContraint],
})
export class UserModule {}
