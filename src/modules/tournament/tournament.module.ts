import { AdminModule } from '@admin/admin.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentController } from './controllers/tournament.controller';
import { TournamentRepository } from './repositories/tournament.repository';
import { TournamentService } from './services/tournament.service';

@Module({
  controllers: [TournamentController],
  imports: [AdminModule, TypeOrmModule.forFeature([TournamentRepository])],
  providers: [TournamentService],
  exports: [TournamentService],
})
export class TournamentModule {}
