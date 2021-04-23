import { Role } from '@common/constants';
import { DeviceEntity } from '@devices/entities/devices.entity';
import { LikesEntity } from '@like/entities/like.entity';
import { NotificationEntity } from '@notification/entities/notification.entity';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserAuthForgottenPasswordEntity } from './userAuthForgottenPassword.entity';

@Entity({ name: 'user_table' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @CreateDateColumn({ type: 'timestamp without time zone', default: 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    onUpdate: 'NOW()',
    nullable: true,
  })
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: Role,
  })
  role: Role;

  @Column({ type: 'varchar', default: 'profile.jpg' })
  profilePath: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  lastname: string;

  @Column({ type: 'boolean', default: true })
  available: boolean;

  @OneToMany(() => NotificationEntity, (notification) => notification.user)
  notifications: NotificationEntity[];

  @OneToMany(() => DeviceEntity, (device) => device.user)
  devices: DeviceEntity[];

  @OneToMany(
    () => UserAuthForgottenPasswordEntity,
    (forgotten_password) => forgotten_password.user,
  )
  forgotten_passwords: UserAuthForgottenPasswordEntity[];

  @OneToMany(() => LikesEntity, (likes) => likes.user)
  likes: LikesEntity[];

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
