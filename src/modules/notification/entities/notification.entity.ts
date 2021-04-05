import { UserEntity } from 'src/modules/user/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'notification' })
export class NotificationEntity {
  @PrimaryGeneratedColumn('uuid')
  notificationId: string;

  @Column()
  title: string;

  @Column()
  message: string;

  @Column({ type: 'timestamptz' })
  readAt: Date;

  @Column({ type: 'timestamptz' })
  sentAt: Date;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.notifications)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
