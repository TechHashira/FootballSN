import { AdminModule } from '@admin/admin.module';
import { CoachModule } from '@coach/coach.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerModule } from '@player/player.module';
import { RefereeModule } from '@referee/referee.module';
import { SecurityModule } from '@security/security.module';
import { UserController } from './controllers/user.controller';
import { IsEmailAlreadyExistsContraint } from './dtos/isEmailAlreadyExist.cv-decorator';
import { UserRepository } from './repositories/user.repository';
import { UserAuthForgottenPasswordRepository } from './repositories/userAuthForgottenPassword.repository';
import { UserService } from './services/user.service';

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
  controllers: [UserController],
  exports: [UserService, IsEmailAlreadyExistsContraint],
  providers: [UserService, IsEmailAlreadyExistsContraint],
})
export class UserModule {}