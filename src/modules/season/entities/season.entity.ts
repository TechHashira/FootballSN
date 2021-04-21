import { TournamentEntity } from 'src/modules/tournament/entities/tournament.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
}
