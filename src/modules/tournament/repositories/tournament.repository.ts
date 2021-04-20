import { EntityRepository, Repository } from 'typeorm';
import { TournamentEntity } from '../entities/tournament.entity';

@EntityRepository(TournamentEntity)
export class TournamentRepository extends Repository<TournamentEntity> {}
