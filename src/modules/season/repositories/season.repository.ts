import { SeasonEntity } from '@season/entities/season.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(SeasonEntity)
export class SeasonRepository extends Repository<SeasonEntity> {}
