import { CoachModule } from '@coach/coach.module';
import { CoachRepository } from '@coach/repositories/coach.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeasonRepository } from '@season/repositories/season.repository';
import { TournamentModule } from '@tournament/tournament.module';
import { TeamRepository } from './repositories/team.repository';
import { TeamRegisterService } from './services/team.service';

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
  providers: [TeamRegisterService],
  exports: [TeamRegisterService],
})
export class TeamModule {}
