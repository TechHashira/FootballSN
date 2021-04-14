import { EntityRepository, Repository } from 'typeorm';
import { PlayerEntity } from '../entities';

@EntityRepository(PlayerEntity)
export class PlayerRepository extends Repository<PlayerEntity> {}
