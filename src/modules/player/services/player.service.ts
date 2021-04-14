import { Injectable } from '@nestjs/common';
import { CreatedFailedException } from 'src/exceptions/createdFailed.exception';
import { CreateUserDto } from 'src/modules/user/dtos';
import { UserEntity } from 'src/modules/user/entities';
import { Connection } from 'typeorm';
import { PlayerEntity } from '../entities';

@Injectable()
export class PlayerService {
  constructor(private connection: Connection) {}

  async createPlayer(createUserDto: CreateUserDto): Promise<PlayerEntity> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = queryRunner.manager.create<UserEntity>(
        UserEntity,
        createUserDto,
      );
      await queryRunner.manager.save<UserEntity>(user);

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
}
