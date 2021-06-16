import { AdminModule } from '@admin/admin.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentRepository } from '@tournament/repositories/tournament.repository';
import { SeasonRepository } from '../repositories/season.repository';
import { SeasonController } from './controllers/season.controller';
import { SeasonService } from './services/season.service';
import { SeasonValidationService } from './services/season.validation.service';

@Module({
  controllers: [SeasonController],
  imports: [
    AdminModule,
    TypeOrmModule.forFeature([TournamentRepository, SeasonRepository]),
  ],
  exports: [SeasonService, SeasonValidationService],
  providers: [SeasonService, SeasonValidationService],
})
export class SeasonModule {}
