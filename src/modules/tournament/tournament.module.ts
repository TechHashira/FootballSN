import { AdminModule } from '@admin/admin.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeasonModule } from '@season/season.module';
import { TournamentController } from './controllers/tournament.controller';
import { TournamentRepository } from './repositories/tournament.repository';
import { TournamentService } from './services/tournament.service';
import { ValidationTournamentService } from './services/validations.tournament.service';

@Module({
  controllers: [TournamentController],
  imports: [
    AdminModule,
    SeasonModule,
    TypeOrmModule.forFeature([TournamentRepository]),
  ],
  providers: [TournamentService, ValidationTournamentService],
  exports: [TournamentService, ValidationTournamentService],
})
export class TournamentModule {}
