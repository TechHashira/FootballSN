import { EntityRepository, Repository } from 'typeorm';
import { ContractEntity } from '../entities';

@EntityRepository(ContractEntity)
export class ContractRepository extends Repository<ContractEntity> {}
