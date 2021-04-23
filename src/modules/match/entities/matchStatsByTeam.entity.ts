import { TeamEntity } from '@team/entities/team.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MatchEntity } from './match.entity';

@Entity({ name: 'match_stats_by_team' })
export class MatchStatsByTeamEntity {
  @PrimaryGeneratedColumn('uuid')
  match_stats_by_team_id: string;

  @Column({ type: 'smallint', nullable: true })
  shots: number;

  @Column({ type: 'smallint', nullable: true })
  shots_on_target: number;

  @Column({ type: 'smallint', nullable: true })
  possession: number;

  @Column({ type: 'smallint', nullable: true })
  pass_accuary: number;

  @Column({ type: 'smallint', nullable: true })
  fouls: number;

  @Column({ type: 'smallint', nullable: true })
  yellow_cards: number;

  @Column({ type: 'smallint', nullable: true })
  red_cards: number;

  @Column({ type: 'smallint', nullable: true })
  offsides: number;

  @Column({ type: 'smallint', nullable: true })
  corners: number;

  @ManyToOne(() => TeamEntity, (team) => team.matchsStats)
  @JoinColumn({ name: 'teamId' })
  team: TeamEntity;

  @ManyToOne(() => MatchEntity, (match) => match.matchsStats)
  @JoinColumn({ name: 'matchId' })
  match: MatchEntity;
}
