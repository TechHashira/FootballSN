import { PlayerEntity } from '@player/entities/player.entity';
import { TeamEntity } from '@team/entities/team.entity';
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

  @OneToOne(() => PlayerEntity)
  @JoinColumn({ name: 'playerId' })
  player: PlayerEntity;

  @Column('uuid')
  playerId: string;

  @OneToMany(() => TeamEntity, (team) => team.coach)
  teams: TeamEntity[];
}
