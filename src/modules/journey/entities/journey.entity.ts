import { MatchHistoryEntity } from 'src/modules/match/entities/matchHistory.entity';
import { SeasonEntity } from 'src/modules/season/entities/season.entity';
import { TournamentEntity } from 'src/modules/tournament/entities/tournament.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'journey' })
export class JourneyEntity {
  @PrimaryGeneratedColumn('uuid')
  journeyId: number;

  @ManyToOne(() => TournamentEntity, (tournament) => tournament.journeys)
  @JoinColumn({ name: 'tournamentId' })
  tournament: TournamentEntity;

  @OneToMany(() => MatchHistoryEntity, (match) => match.journey)
  matchs: MatchHistoryEntity[];

  @ManyToOne(() => SeasonEntity, (season) => season.journeys)
  season: SeasonEntity;
}
