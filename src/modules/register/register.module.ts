import { Module } from '@nestjs/common';
import { SeasonModule } from '@season/season.module';
import { TournamentModule } from '@tournament/tournament.module';
import { UserModule } from '@user/user.module';
import { UsersRegisterController } from './controllers/user.register.controller';

@Module({
  imports: [UserModule, TournamentModule, SeasonModule],
  controllers: [UsersRegisterController],
})
export class RegisterModule {}
