import { EntityRepository, Repository } from 'typeorm';
import { TeamEntity } from '../entities';

@EntityRepository(TeamEntity)
export class TeamRepository extends Repository<TeamEntity> {}
