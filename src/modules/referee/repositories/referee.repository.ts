import { RefereeEntity } from '@referee/entities/referee.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RefereeEntity)
export class RefereeRepository extends Repository<RefereeEntity> {}
