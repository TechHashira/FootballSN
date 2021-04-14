import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityModule } from '../security/security.module';
import { CoachRepository } from './repositories/coach.repository';
import { CoachService } from './services/coach.service';

@Module({
  imports: [SecurityModule, TypeOrmModule.forFeature([CoachRepository])],
  exports: [CoachService],
  providers: [CoachService],
})
export class CoachModule {}
