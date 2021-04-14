import { EntityRepository, Repository } from 'typeorm';
import { RefereeEntity } from '../entities/referee.entity';

@EntityRepository(RefereeEntity)
export class RefereeRepository extends Repository<RefereeEntity> {}
