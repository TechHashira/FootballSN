import { CoachEntity } from 'src/modules/coach/entities';
import { MatchEntity } from 'src/modules/match/entities/match.entity';
import { MatchStatsByTeamEntity } from 'src/modules/match/entities/matchStatsByTeam.entity';
import { PlayerEntity } from 'src/modules/player/entities';
import { TournamentEntity } from 'src/modules/tournament/entities/tournament.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TeamStatsEntity } from './teamStats.entity';

@Entity({ name: 'team' })
export class TeamEntity {
  @PrimaryGeneratedColumn('uuid')
  teamId: string;

  @Column({ type: 'varchar' })
  team_name: string;

  @Column({ type: 'boolean', default: true })
  available: boolean;

  @CreateDateColumn({ type: 'timestamp without time zone', default: 'NOW()' })
  createdAt: Date;

  @ManyToOne(() => CoachEntity, (coach) => coach.teams)
  @JoinColumn({ name: 'coachId' })
  coach: CoachEntity;

  @ManyToOne(() => TournamentEntity, (tournament) => tournament.teams)
  @JoinColumn({ name: 'tournamentId' })
  tournament: TournamentEntity;

  @OneToMany(() => TeamStatsEntity, (team_stats) => team_stats.team)
  team_stats: TeamStatsEntity[];

  @OneToMany(() => MatchEntity, (match) => match.team)
  matchs: MatchEntity[];

  @OneToMany(() => MatchStatsByTeamEntity, (matchsStasts) => matchsStasts.team)
  matchsStats: MatchStatsByTeamEntity[];

  @OneToMany(() => PlayerEntity, (player) => player.team)
  players: PlayerEntity[];
}
