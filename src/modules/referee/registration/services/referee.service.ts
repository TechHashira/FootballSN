import { CreatedFailedException } from '@exceptions/createdFailed.exception';
import { Injectable } from '@nestjs/common';
import { RefereeEntity } from '@referee/entities/referee.entity';
import { UserEntity } from '@user/entities/user.entity';
import { Connection } from 'typeorm';

@Injectable()
export class RefereeService {
  constructor(private connection: Connection) {}

  async createReferee(user: UserEntity) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const referee = queryRunner.manager.create<RefereeEntity>(RefereeEntity, {
        user,
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
