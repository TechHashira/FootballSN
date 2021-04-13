import { MatchEntity } from 'src/modules/match/entities/match.entity';
import { TournamentEntity } from 'src/modules/tournament/entities/tournament.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TeamEntity } from './team.entity';

@Entity({ name: 'team_stats' })
export class TeamStatsEntity {
  @PrimaryGeneratedColumn('uuid')
  team_stats_id: string;

  @Column({ type: 'smallint' })
  matches_played: number;

  @Column({ type: 'smallint' })
  wins: number;

  @Column({ type: 'smallint' })
  lost_matches: number;

  @Column({ type: 'smallint' })
  ties: number;

  @Column({ type: 'smallint' })
  goals_for: number;

  @Column({ type: 'smallint' })
  goals_against: number;

  @Column({ type: 'smallint' })
  goals_difference: number;

  @Column({ type: 'smallint' })
  points: number;

  @OneToOne(() => TournamentEntity)
  @JoinColumn({ name: 'tournamentId' })
  tournament: TournamentEntity;

  @ManyToOne(() => TeamEntity, (team) => team.team_stats)
  @JoinColumn({ name: 'teamId' })
  team: TeamEntity;

  @ManyToOne(() => MatchEntity, (match) => match.matchsStats)
  @JoinColumn({ name: 'matchId' })
  match: MatchEntity;
}
