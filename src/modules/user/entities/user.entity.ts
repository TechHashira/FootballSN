import { RoleType } from 'src/common/constants';
import { DeviceEntity } from 'src/modules/devices/entities';
import { NotificationEntity } from 'src/modules/notification/entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserAuthForgottenPasswordEntity } from './userAuthForgottenPassword.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: RoleType,
    array: true,
    default: [RoleType.User],
  })
  roles: RoleType[];

  @Column()
  profilePath: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @OneToMany(() => NotificationEntity, (notification) => notification.user)
  notifications: NotificationEntity[];

  @OneToMany(() => DeviceEntity, (device) => device.user)
  devices: DeviceEntity[];

  @OneToMany(
    () => UserAuthForgottenPasswordEntity,
    (forgotten_password) => forgotten_password.user,
  )
  forgotten_passwords: UserAuthForgottenPasswordEntity[];
}
