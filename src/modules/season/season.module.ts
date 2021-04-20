import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeasonRepository } from './repositories/season.repository';
import { SeasonService } from './services/season.service';

@Module({
  imports: [TypeOrmModule.forFeature([SeasonRepository])],
  exports: [SeasonService],
  providers: [SeasonService],
})
export class SeasonModule {}
