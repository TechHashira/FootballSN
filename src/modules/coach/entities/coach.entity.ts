import { PlayerEntity } from 'src/modules/player/entities';
import { TeamEntity } from 'src/modules/team/entities';
import {
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
  user: PlayerEntity;

  @OneToMany(() => TeamEntity, (team) => team.coach)
  teams: TeamEntity[];
}
