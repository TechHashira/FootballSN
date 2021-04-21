import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeasonController } from './controllers/season.controller';
import { SeasonRepository } from './repositories/season.repository';
import { SeasonService } from './services/season.service';

@Module({
  controllers: [SeasonController],
  imports: [TypeOrmModule.forFeature([SeasonRepository])],
  exports: [SeasonService],
  providers: [SeasonService],
})
export class SeasonModule {}
