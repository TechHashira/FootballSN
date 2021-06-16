import { CoachModule } from '@coach/registration/coach.module';
import { CoachRepository } from '@coach/repositories/coach.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeasonRepository } from '@season/repositories/season.repository';
import { TournamentModule } from '@tournament/registration/tournament.module';
import { TeamRepository } from '../repositories/team.repository';
import { TeamRegisterService } from './services/team.service';
import { TeamTournamentRegisterService } from './services/teamTournamentRegister.service';

@Module({
  imports: [
    TournamentModule,
    CoachModule,
    TypeOrmModule.forFeature([
      TeamRepository,
      CoachRepository,
      SeasonRepository,
    ]),
  ],
  providers: [TeamRegisterService, TeamTournamentRegisterService],
  exports: [TeamRegisterService, TeamTournamentRegisterService],
})
export class TeamModule {}
