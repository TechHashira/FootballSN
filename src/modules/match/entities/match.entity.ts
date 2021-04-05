import { JourneyEntity } from 'src/modules/journey/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IMatchProperties } from '../interfaces/match.interface';

@Entity({ name: 'match' })
export class MatchEntity {
  @PrimaryGeneratedColumn('uuid')
  matchId: string;

  @Column({ type: 'timestamptz' })
  start_time: Date;

  @Column({ type: 'jsonb' })
  match_data: IMatchProperties[];

  @ManyToOne(() => JourneyEntity, (journey) => journey.matchs)
  @JoinColumn({ name: 'journeyId' })
  journey: JourneyEntity;
}
