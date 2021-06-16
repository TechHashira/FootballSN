import { Module } from '@nestjs/common';
import { SeasonModule } from '@season/registration/season.module';
import { TeamModule } from '@team/registration/team.module';
import { TournamentModule } from '@tournament/registration/tournament.module';
import { UserModule } from '@user/registration/user.module';
import { RegisterController } from './controllers/user.register.controller';

@Module({
  imports: [UserModule, TournamentModule, SeasonModule, TeamModule],
  controllers: [RegisterController],
})
export class RegisterModule {}
