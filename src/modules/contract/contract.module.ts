import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractRepository } from './repositories/contract.repository';
import { ContractService } from './services/contract.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContractRepository])],
  providers: [ContractService],
  exports: [ContractService],
})
export class ContractModule {}
