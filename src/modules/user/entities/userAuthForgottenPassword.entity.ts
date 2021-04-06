import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'users_auth_forgotten_passwords' })
export class UserAuthForgottenPasswordEntity {
  @PrimaryGeneratedColumn('uuid')
  user_forgotten_pasword_id: string;

  @Column({ type: 'varchar' })
  hashedToken: string;

  @CreateDateColumn({ type: 'timestamp without time zone', default: 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    onUpdate: 'NOW()',
    nullable: true,
  })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.forgotten_passwords)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
