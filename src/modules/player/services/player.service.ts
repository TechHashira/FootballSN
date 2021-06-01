import { CreatedFailedException } from '@exceptions/createdFailed.exception';
import { Injectable } from '@nestjs/common';
import { PlayerEntity } from '@player/entities/player.entity';
import { PlayerRepository } from '@player/repositories/player.repository';
import { UserEntity } from '@user/entities/user.entity';
import { Connection } from 'typeorm';

@Injectable()
export class PlayerService {
  constructor(
    private connection: Connection,
    private _playerRepository: PlayerRepository,
  ) {}

  async createPlayer(user: UserEntity): Promise<PlayerEntity> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const player = queryRunner.manager.create<PlayerEntity>(PlayerEntity, {
        user,
      });
      await queryRunner.manager.save<PlayerEntity>(player);

      await queryRunner.commitTransaction();

      return player;
    } catch ({ message }) {
      await queryRunner.rollbackTransaction();

      throw new CreatedFailedException(message);
    } finally {
      await queryRunner.release();
    }
  }

  async findPlayerByUserId(userId: string): Promise<PlayerEntity> {
    return await this._playerRepository.findOne({ where: { userId } });
  }
}
