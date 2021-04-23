import { JourneyEntity } from '@journey/entities/journey.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(JourneyEntity)
export class JourneyRepository extends Repository<JourneyEntity> {}
