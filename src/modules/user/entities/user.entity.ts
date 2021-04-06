import { RoleType } from 'src/common/constants';
import { DeviceEntity } from 'src/modules/devices/entities';
import { LikesEntity } from 'src/modules/like/entities';
import { NotificationEntity } from 'src/modules/notification/entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserAuthForgottenPasswordEntity } from './userAuthForgottenPassword.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({
    type: 'enum',
    enum: RoleType,
    array: true,
    default: [RoleType.User],
  })
  roles: RoleType[];

  @Column({ type: 'varchar' })
  profilePath: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
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

  @OneToMany(() => LikesEntity, (likes) => likes.user)
  likes: LikesEntity[];
}
