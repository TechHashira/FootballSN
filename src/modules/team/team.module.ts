import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoachModule } from '../coach/coach.module';
import { TournamentModule } from '../tournament/tournament.module';
import { TeamRepository } from './repositories/team.repository';
import { TeamService } from './services/team.service';

@Module({
  imports: [
    TournamentModule,
    CoachModule,
    TypeOrmModule.forFeature([TeamRepository]),
  ],
  providers: [TeamService],
  exports: [TeamService],
})
export class TeamModule {}
