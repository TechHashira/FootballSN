import { MatchEntity } from 'src/modules/match/entities/match.entity';
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

  @OneToMany(() => MatchEntity, (match) => match.journey)
  matchs: MatchEntity[];
}
