import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityModule } from '@security/security.module';
import { UserController } from './controllers/user.controller';
import { IsEmailAlreadyExistsContraint } from './dtos/isEmailAlreadyExist.cv-decorator';
import { UserRepository } from './repositories/user.repository';
import { UserAuthForgottenPasswordRepository } from './repositories/userAuthForgottenPassword.repository';
import { UserService } from './services/user.service';

@Module({
  imports: [
    SecurityModule,
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
