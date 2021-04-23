import { AdminModule } from '@admin/admin.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentRepository } from '@tournament/repositories/tournament.repository';
import { SeasonController } from './controllers/season.controller';
import { SeasonRepository } from './repositories/season.repository';
import { SeasonService } from './services/season.service';

@Module({
  controllers: [SeasonController],
  imports: [
    AdminModule,
    TypeOrmModule.forFeature([TournamentRepository, SeasonRepository]),
  ],
  exports: [SeasonService],
  providers: [SeasonService],
})
export class SeasonModule {}
