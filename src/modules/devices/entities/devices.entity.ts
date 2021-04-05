import { UserEntity } from 'src/modules/user/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'device' })
export class DeviceEntity {
  @PrimaryGeneratedColumn('uuid')
  deviceId: string;

  @Column()
  fmcToken: string;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => UserEntity, (user) => user.devices)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
