import { Injectable } from '@nestjs/common';
import { CreatedFailedException } from 'src/exceptions/createdFailed.exception';
import { PlayerEntity } from 'src/modules/player/entities';
import { CreateCoachDto } from 'src/modules/user/dtos/creationalDtos/createCoachDto.dto';
import { UserEntity } from 'src/modules/user/entities';
import { Connection } from 'typeorm';
import { CoachEntity } from '../entities';

@Injectable()
export class CoachService {
  constructor(private connection: Connection) {}

  async createCoach(createCoachDto: CreateCoachDto): Promise<CoachEntity> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = queryRunner.manager.create<UserEntity>(
        UserEntity,
        createCoachDto,
      );
      await queryRunner.manager.save<UserEntity>(user);

      const player = queryRunner.manager.create<PlayerEntity>(PlayerEntity, {
        user,
      });
      await queryRunner.manager.save<PlayerEntity>(player);

      const coach = queryRunner.manager.create<CoachEntity>(CoachEntity, {
        player,
      });
      await queryRunner.manager.save<CoachEntity>(coach);

      await queryRunner.commitTransaction();

      return coach;
    } catch ({ message }) {
      await queryRunner.rollbackTransaction();
      throw new CreatedFailedException(message);
    } finally {
      await queryRunner.release();
    }
  }
}
