import { AdminEntity } from '@admin/entities/admin.entity';
import { AdminRepository } from '@admin/repositories/admin.repository';
import { CreatedFailedException } from '@exceptions/createdFailed.exception';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@user/entities/user.entity';
import { Connection } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    private connection: Connection,
    private _adminRepository: AdminRepository,
  ) {}

  async createAdmin(user: UserEntity): Promise<AdminEntity> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
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

  async getAdminByUserId(userId: string): Promise<AdminEntity> {
    try {
      const admin = await this._adminRepository.findOne({
        where: { userId },
      });
      return admin;
    } catch (error) {
      throw Error(error);
    }
  }
}
