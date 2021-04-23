import { TeamEntity } from '@team/entities/team.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(TeamEntity)
export class TeamRepository extends Repository<TeamEntity> {}
