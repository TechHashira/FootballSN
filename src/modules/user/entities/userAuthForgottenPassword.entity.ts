import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'users_auth_forgotten_passwords' })
export class UserAuthForgottenPasswordEntity {
  @PrimaryGeneratedColumn('uuid')
  user_forgotten_pasword_id: string;

  @Column({ type: 'varchar' })
  hashedToken: string;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.forgotten_passwords)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
