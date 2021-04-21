import { Injectable } from '@nestjs/common';
import { CreatedFailedException } from 'src/exceptions/createdFailed.exception';
import { SecurityService } from 'src/modules/security/services/security.service';
import { CreatePlayerDto } from 'src/modules/user/dtos/creationalDtos/createPlayerDto.dto';
import { UserEntity } from 'src/modules/user/entities';
import { Connection } from 'typeorm';
import { PlayerEntity } from '../entities';

@Injectable()
export class PlayerService {
  constructor(
    private connection: Connection,
    private _securityService: SecurityService,
  ) {}

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<PlayerEntity> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const dtoHashed = await this._securityService.hashPassword(
        createPlayerDto,
      );
      const user = queryRunner.manager.create<UserEntity>(
        UserEntity,
        dtoHashed,
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
