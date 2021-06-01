import { JourneyEntity } from '@journey/entities/journey.entity';
import { TeamEntity } from '@team/entities/team.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MatchStatsByTeamEntity } from './matchStatsByTeam.entity';

@Entity({ name: 'match' })
export class MatchEntity {
  @PrimaryGeneratedColumn('uuid')
  matchId: string;

  @Column({ type: 'boolean', default: false })
  finalized: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  date: Date;

  @Column({ type: 'varchar', nullable: true })
  place: string;

  @ManyToOne(() => JourneyEntity, (journey) => journey.matchs)
  journey: JourneyEntity;

  @ManyToOne(() => TeamEntity, (team) => team.matchs)
  @JoinColumn({ name: 'teamId' })
  team: TeamEntity;

  @OneToMany(() => MatchStatsByTeamEntity, (matchsStats) => matchsStats.match)
  matchsStats: MatchStatsByTeamEntity[];
}
