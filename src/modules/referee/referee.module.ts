import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefereeRepository } from './repositories/referee.repository';
import { RefereeService } from './services/referee.service';

@Module({
  imports: [TypeOrmModule.forFeature([RefereeRepository])],
  exports: [RefereeService],
  providers: [RefereeService],
})
export class RefereeModule {}
