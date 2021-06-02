import { TeamEntity } from '@team/entities/team.entity';
import { UserEntity } from '@user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'coach' })
export class CoachEntity {
  @PrimaryGeneratedColumn('uuid')
  coachId: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column('uuid')
  userId: string;

  @OneToMany(() => TeamEntity, (team) => team.coach)
  teams: TeamEntity[];
}
