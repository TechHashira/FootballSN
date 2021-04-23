import { CreatedFailedException } from '@exceptions/createdFailed.exception';
import { Injectable } from '@nestjs/common';
import { PlayerEntity } from '@player/entities/player.entity';
import { RefereeEntity } from '@referee/entities/referee.entity';
import { SecurityService } from '@security/services/security.service';
import { CreateRefereeDto } from '@user/dtos/creationalDtos/createRefereeDto.dto';
import { UserEntity } from '@user/entities/user.entity';
import { Connection } from 'typeorm';

@Injectable()
export class RefereeService {
  constructor(
    private connection: Connection,
    private _securityService: SecurityService,
  ) {}

  async createReferee(createRefereeDto: CreateRefereeDto) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const dtoHashed = await this._securityService.hashPassword(
        createRefereeDto,
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

      const referee = queryRunner.manager.create<RefereeEntity>(RefereeEntity, {
        player,
      });
      await queryRunner.manager.save<RefereeEntity>(referee);

      await queryRunner.commitTransaction();

      return referee;
    } catch ({ message }) {
      await queryRunner.rollbackTransaction();
      throw new CreatedFailedException(message);
    } finally {
      await queryRunner.release();
    }
  }
}
