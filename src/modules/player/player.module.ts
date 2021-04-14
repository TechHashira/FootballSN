import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerRepository } from './repositories/player.repository';
import { PlayerService } from './services/player.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerRepository])],
  exports: [PlayerService],
  providers: [PlayerService],
})
export class PlayerModule {}
