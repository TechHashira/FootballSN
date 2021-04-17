import { UserEntity } from 'src/modules/user/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'notification' })
export class NotificationEntity {
  @PrimaryGeneratedColumn('uuid')
  notificationId: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  message: string;

  @Column({ type: 'timestamptz', nullable: true })
  readAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  sentAt: Date;

  @CreateDateColumn({ type: 'timestamp without time zone', default: 'NOW()' })
  createdAt: Date;

  @Column({ type: 'boolean', default: false })
  checked: boolean;

  @ManyToOne(() => UserEntity, (user) => user.notifications)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
