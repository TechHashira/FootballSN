import { UserEntity } from '@user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'device' })
@Unique(['fcm_token'])
export class DeviceEntity {
  @PrimaryGeneratedColumn('uuid')
  deviceId: string;

  @Column({ type: 'varchar' })
  fcm_token: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @ManyToOne(() => UserEntity, (user) => user.devices)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column()
  userId: string;
}
