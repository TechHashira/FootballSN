import { MatchHistoryEntity } from '@match/entities/matchHistory.entity';
import { SeasonEntity } from '@season/entities/season.entity';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'journey' })
export class JourneyEntity {
  @PrimaryGeneratedColumn('uuid')
  journeyId: number;

  @OneToMany(() => MatchHistoryEntity, (match) => match.journey)
  matchs: MatchHistoryEntity[];

  @ManyToOne(() => SeasonEntity, (season) => season.journeys)
  season: SeasonEntity;
}
