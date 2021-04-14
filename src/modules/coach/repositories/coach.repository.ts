import { EntityRepository, Repository } from 'typeorm';
import { CoachEntity } from '../entities';

@EntityRepository(CoachEntity)
export class CoachRepository extends Repository<CoachEntity> {}
