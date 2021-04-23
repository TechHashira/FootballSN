import { DeviceEntity } from '@devices/entities/devices.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(DeviceEntity)
export class DeviceRepository extends Repository<DeviceEntity> {}
