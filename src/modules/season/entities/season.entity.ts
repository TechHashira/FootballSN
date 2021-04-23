import { JourneyEntity } from '@journey/entities/journey.entity';
import { TeamStatsEntity } from '@team/entities/teamStats.entity';
import { TournamentEntity } from '@tournament/entities/tournament.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'season' })
export class SeasonEntity {
  @PrimaryGeneratedColumn('uuid')
  seasonId: string;

  @Column({ type: 'timestamptz' })
  pre_season_init_date: Date;

  @Column({ type: 'timestamptz' })
  pre_season_final_date: Date;

  @Column({ type: 'timestamptz', nullable: true })
  official_season_init_date?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  official_season_final_date?: Date;

  @Column({ type: 'boolean', default: true })
  seasonState: boolean;

  @ManyToOne(() => TournamentEntity, (tournament) => tournament.seasons)
  @JoinColumn({ name: 'tournamentId' })
  tournament: TournamentEntity;

  @OneToMany(() => TeamStatsEntity, (team_stats) => team_stats.season)
  team_stats: TeamStatsEntity[];

  @OneToMany(() => JourneyEntity, (journey) => journey.season)
  journeys: JourneyEntity[];
}
