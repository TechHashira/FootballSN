import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { DeviceController } from './controllers/device.controller';
import { DeviceRepository } from './repositories/device.repository';
import { DeviceService } from './services/device.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([DeviceRepository])],
  controllers: [DeviceController],
  providers: [DeviceService],
  exports: [DeviceService],
})
export class DeviceModule {}
