import { AdminEntity } from '@admin/entities/admin.entity';
import { AdminRepository } from '@admin/repositories/admin.repository';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { SecurityService } from '@security/services/security.service';
import { Connection, QueryRunner } from 'typeorm';
import { AdminService } from './admin.service';

const adminTest = new AdminEntity();
const user_dto = {
  name: 'Leonardo',
  lastname: 'Di Caprio',
  email: 'e@gmail.com',
  password: 'asd123',
};

describe('AdminService', () => {
  let admin_service: AdminService;
  let security_service: SecurityService;
  let connection: Connection;

  const qr = {
    manager: {},
  } as QueryRunner;

  class ConnectionMock {
    createQueryRunner(mode?: 'master' | 'slave'): QueryRunner {
      return qr;
    }
  }

  beforeEach(async () => {
    // reset qr mocked function
    Object.assign(qr.manager, {
      save: jest.fn().mockResolvedValue(adminTest),
      create: jest.fn().mockReturnValue(adminTest),
    });
    qr.connect = jest.fn();
    qr.release = jest.fn();
    qr.startTransaction = jest.fn();
    qr.commitTransaction = jest.fn();
    qr.rollbackTransaction = jest.fn();
    qr.release = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: SecurityService,
          useValue: {
            hashPassword: jest.fn().mockResolvedValue(user_dto),
          },
        },
        {
          provide: Connection,
          useClass: ConnectionMock,
        },
        AdminRepository,
      ],
      imports: [ConfigModule],
    }).compile();

    admin_service = module.get<AdminService>(AdminService);
    security_service = module.get<SecurityService>(SecurityService);
    connection = module.get<Connection>(Connection);
  });

  it('should be defined', () => {
    expect(admin_service).toBeDefined();
  });

  describe('createAdmin', () => {
    it('should get a adminEntity object', async () => {
      expect(await admin_service.createAdmin(user_dto)).toBeInstanceOf(
        AdminEntity,
      );
    });
  });
});
