import { Injectable } from '@nestjs/common';
import { CreatedFailedException } from 'src/exceptions/createdFailed.exception';
import { SecurityService } from 'src/modules/security/services/security.service';
import { CreateAdminDto } from 'src/modules/user/dtos/creationalDtos/createAdminDto.dto';
import { UserEntity } from 'src/modules/user/entities';
import { Connection } from 'typeorm';
import { AdminEntity } from '../entities';

@Injectable()
export class AdminService {
  constructor(
    private connection: Connection,
    private _securityService: SecurityService,
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto): Promise<AdminEntity> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const dtoHashed = await this._securityService.hashPassword(
        createAdminDto,
      );
      const user = queryRunner.manager.create<UserEntity>(
        UserEntity,
        dtoHashed,
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
