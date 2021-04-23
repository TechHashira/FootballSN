import { TournamentEntity } from '@tournament/entities/tournament.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(TournamentEntity)
export class TournamentRepository extends Repository<TournamentEntity> {}
