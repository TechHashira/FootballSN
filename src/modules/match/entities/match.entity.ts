import { TeamEntity } from 'src/modules/team/entities';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MatchHistoryEntity } from './matchHistory.entity';
import { MatchStatsByTeamEntity } from './matchStatsByTeam.entity';

@Entity({ name: 'match' })
export class MatchEntity {
  @PrimaryGeneratedColumn('uuid')
  matchId: string;

  @ManyToOne(() => MatchHistoryEntity, (matchHistory) => matchHistory.matchs)
  @JoinColumn({ name: 'match_history_id' })
  matchHistory: MatchHistoryEntity;

  @ManyToOne(() => TeamEntity, (team) => team.matchs)
  @JoinColumn({ name: 'teamId' })
  team: TeamEntity;

  @OneToMany(() => MatchStatsByTeamEntity, (matchsStats) => matchsStats.match)
  matchsStats: MatchStatsByTeamEntity[];
}
