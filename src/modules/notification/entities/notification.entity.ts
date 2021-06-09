import { Notification } from '@common/constants';
import { UserEntity } from '@user/entities/user.entity';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({ name: 'notification' })
export class NotificationEntity {
  constructor(partial: Partial<NotificationEntity>) {
    Object.assign(this, partial);
  }

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

  @Column({ type: 'enum', enum: Notification })
  type: Notification;

  @Column({ type: 'uuid', nullable: true })
  subjectId: string;

  @Column({ type: 'uuid', nullable: true })
  subjectObjectiveId: string;

  @CreateDateColumn({ type: 'timestamp without time zone', default: 'NOW()' })
  createdAt: Date;

  @Column({ type: 'boolean', default: false })
  seen: boolean;

  @ManyToOne(() => UserEntity, (user) => user.notifications)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Exclude()
  @Column({ type: 'uuid' })
  userId: string;
}
