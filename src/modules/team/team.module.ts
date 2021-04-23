import { CoachModule } from '@coach/coach.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeasonRepository } from '@season/repositories/season.repository';
import { TournamentModule } from '@tournament/tournament.module';
import { TeamRepository } from './repositories/team.repository';
import { TeamService } from './services/team.service';

@Module({
  imports: [
    TournamentModule,
    CoachModule,
    TypeOrmModule.forFeature([TeamRepository, SeasonRepository]),
  ],
  providers: [TeamService],
  exports: [TeamService],
})
export class TeamModule {}
