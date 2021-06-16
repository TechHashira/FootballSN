import { AdminModule } from '@admin/admin.module';
import { CoachModule } from '@coach/registration/coach.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerModule } from '@player/registration/player.module';
import { RefereeModule } from '@referee/registration/referee.module';
import { SecurityModule } from '@security/security.module';
import { UserRepository } from '../repositories/user.repository';
import { UserAuthForgottenPasswordRepository } from '../repositories/userAuthForgottenPassword.repository';
import { IsEmailAlreadyExistsContraint } from './dtos/isEmailAlreadyExist.cv-decorator';
import { SearchUserService } from './services/searchUser.service';
import { UserRegisterService } from './services/user.register.service';

@Module({
  imports: [
    SecurityModule,
    AdminModule,
    RefereeModule,
    PlayerModule,
    CoachModule,
    TypeOrmModule.forFeature([
      UserRepository,
      UserAuthForgottenPasswordRepository,
    ]),
  ],
  exports: [
    UserRegisterService,
    IsEmailAlreadyExistsContraint,
    SearchUserService,
  ],
  providers: [
    UserRegisterService,
    IsEmailAlreadyExistsContraint,
    SearchUserService,
  ],
})
export class UserModule {}
