import { Injectable } from '@nestjs/common';
import { PlayerEntity } from 'src/modules/player/entities';
import { ContractRepository } from '../repositories/contract.repository';

@Injectable()
export class ContractService {
  constructor(private readonly _contractRepository: ContractRepository) {}

  async createContract(player: PlayerEntity): Promise<void> {
    const contract = this._contractRepository.create({ player });
    await this._contractRepository.save(contract);
  }
}
