import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityModule } from '../security/security.module';
import { RefereeRepository } from './repositories/referee.repository';
import { RefereeService } from './services/referee.service';

@Module({
  imports: [SecurityModule, TypeOrmModule.forFeature([RefereeRepository])],
  exports: [RefereeService],
  providers: [RefereeService],
})
export class RefereeModule {}
