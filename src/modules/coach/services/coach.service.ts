import { CoachEntity } from '@coach/entities/coach.entity';
import { CoachRepository } from '@coach/repositories/coach.repository';
import { CreatedFailedException } from '@exceptions/createdFailed.exception';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PlayerService } from '@player/services/player.service';
import { UserEntity } from '@user/entities/user.entity';
import { Connection } from 'typeorm';

@Injectable()
export class CoachService {
  constructor(
    private connection: Connection,
    private readonly _coachRepository: CoachRepository,
    private _playerService: PlayerService,
  ) {}

  async createCoach(user: UserEntity): Promise<CoachEntity> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const coach = queryRunner.manager.create<CoachEntity>(CoachEntity, {
        user,
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

  async findCoachByPlayerId(playerId: string): Promise<CoachEntity> {
    return await this._coachRepository.findOne({ where: { playerId } });
  }
}
