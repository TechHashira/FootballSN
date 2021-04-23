import { TournamentEntity } from '@tournament/entities/tournament.entity';
import { UserEntity } from '@user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'admin' })
export class AdminEntity {
  @PrimaryGeneratedColumn('uuid')
  adminId: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ type: 'uuid' })
  userId: string;

  @OneToMany(() => TournamentEntity, (tournament) => tournament.admin)
  tournaments: TournamentEntity[];
}
