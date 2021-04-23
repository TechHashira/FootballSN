import { PlayerEntity } from '@player/entities/player.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PlayerEntity)
export class PlayerRepository extends Repository<PlayerEntity> {}
