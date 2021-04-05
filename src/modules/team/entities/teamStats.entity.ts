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

  @Column()
  matches_played: number;

  @Column()
  wins: number;

  @Column()
  lost_matches: number;

  @Column()
  ties: number;

  @Column()
  goals_for: number;

  @Column()
  goals_against: number;

  @Column()
  goals_difference: number;

  @Column()
  points: number;

  @OneToOne(() => TournamentEntity)
  @JoinColumn({ name: 'tournamentId' })
  tournament: TournamentEntity;

  @ManyToOne(() => TeamEntity, (team) => team.team_stats)
  @JoinColumn({ name: 'teamId' })
  team: TeamEntity;
}
