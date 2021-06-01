import { CoachEntity } from '@coach/entities/coach.entity';
import { MatchEntity } from '@match/entities/match.entity';
import { MatchStatsByTeamEntity } from '@match/entities/matchStatsByTeam.entity';
import { PlayerEntity } from '@player/entities/player.entity';
import { TournamentEntity } from '@tournament/entities/tournament.entity';
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

  @Column({ type: 'uuid', nullable: true })
  tournamentId: string;

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
