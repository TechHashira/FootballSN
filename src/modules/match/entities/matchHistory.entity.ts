import { JourneyEntity } from 'src/modules/journey/entities';
import { RefereeEntity } from 'src/modules/referee/entities/referee.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MatchEntity } from './match.entity';

@Entity({ name: 'match_history' })
export class MatchHistoryEntity {
  @PrimaryGeneratedColumn('uuid')
  match_history_id: string;

  @Column({ type: 'timestamptz', nullable: true })
  start_time: Date;

  @ManyToOne(() => JourneyEntity, (journey) => journey.matchs)
  @JoinColumn({ name: 'journeyId' })
  journey: JourneyEntity;

  @ManyToOne(() => RefereeEntity, (referee) => referee.matchsHistory)
  referee: RefereeEntity;

  @OneToMany(() => MatchEntity, (match) => match.matchHistory)
  matchs: MatchEntity[];
}
