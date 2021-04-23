import { CoachEntity } from '@coach/entities/coach.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(CoachEntity)
export class CoachRepository extends Repository<CoachEntity> {}
