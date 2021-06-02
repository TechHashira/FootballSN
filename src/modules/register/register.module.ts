import { Module } from '@nestjs/common';
import { SeasonModule } from '@season/season.module';
import { TeamModule } from '@team/team.module';
import { TournamentModule } from '@tournament/tournament.module';
import { UserModule } from '@user/user.module';
import { RegisterController } from './controllers/user.register.controller';

@Module({
  imports: [UserModule, TournamentModule, SeasonModule, TeamModule],
  controllers: [RegisterController],
})
export class RegisterModule {}
