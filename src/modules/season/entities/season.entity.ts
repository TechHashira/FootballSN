import { JourneyEntity } from 'src/modules/journey/entities';
import { TeamStatsEntity } from 'src/modules/team/entities';
import { TournamentEntity } from 'src/modules/tournament/entities/tournament.entity';
import {
  Column,
  Entity,
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

  @ManyToOne(() => TournamentEntity, (tournament) => tournament.seasons)
  tournament: TournamentEntity;

  @OneToMany(() => TeamStatsEntity, (team_stats) => team_stats.season)
  team_stats: TeamStatsEntity[];

  @OneToMany(() => JourneyEntity, (journey) => journey.season)
  journeys: JourneyEntity[];
}
