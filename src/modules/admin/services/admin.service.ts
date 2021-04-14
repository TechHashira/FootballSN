import { Injectable } from '@nestjs/common';
import { CreatedFailedException } from 'src/exceptions/createdFailed.exception';
import { CreateUserDto } from 'src/modules/user/dtos';
import { UserEntity } from 'src/modules/user/entities';
import { Connection } from 'typeorm';
import { AdminEntity } from '../entities';

@Injectable()
export class AdminService {
  constructor(private connection: Connection) {}

  async createAdmin(createUserDto: CreateUserDto): Promise<AdminEntity> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = queryRunner.manager.create<UserEntity>(
        UserEntity,
        createUserDto,
      );
      await queryRunner.manager.save<UserEntity>(user);

      const admin = queryRunner.manager.create<AdminEntity>(AdminEntity, {
        user,
      });
      await queryRunner.manager.save<AdminEntity>(admin);

      await queryRunner.commitTransaction();

      return admin;
    } catch ({ message }) {
      await queryRunner.rollbackTransaction();
      throw new CreatedFailedException(message);
    } finally {
      await queryRunner.release();
    }
  }
}
