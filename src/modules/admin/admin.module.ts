import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityModule } from '@security/security.module';
import { AdminController } from './controllers/admin.controller';
import { AdminRepository } from './repositories/admin.repository';
import { AdminService } from './services/admin.service';

@Module({
  imports: [SecurityModule, TypeOrmModule.forFeature([AdminRepository])],
  controllers: [AdminController],
  exports: [AdminService],
  providers: [AdminService],
})
export class AdminModule {}
