import { CoachEntity } from '@coach/entities/coach.entity';
import { CoachRepository } from '@coach/repositories/coach.repository';
import { CreatedFailedException } from '@exceptions/createdFailed.exception';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PlayerEntity } from '@player/entities/player.entity';
import { PlayerService } from '@player/services/player.service';
import { SecurityService } from '@security/services/security.service';
import { CreateCoachDto } from '@user/dtos/creationalDtos/createCoachDto.dto';
import { UserEntity } from '@user/entities/user.entity';
import { Connection } from 'typeorm';

@Injectable()
export class CoachService {
  constructor(
    private connection: Connection,
    private _securityService: SecurityService,
    private readonly _coachRepository: CoachRepository,
    private _playerService: PlayerService,
  ) {}

  async createCoach(createCoachDto: CreateCoachDto): Promise<CoachEntity> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const dtoHashed = await this._securityService.hashPassword(
        createCoachDto,
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

  async findCoachByPlayerId(playerId: string): Promise<CoachEntity> {
    return await this._coachRepository.findOne({ where: { playerId } });
  }

  async findCoachByUserId(userId: string) {
    try {
      const { playerId } = await this._playerService.findPlayerByUserId(userId);
      const coach = await this._coachRepository.findOne({
        where: { playerId },
      });

      return coach;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
