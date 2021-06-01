import { MatchEntity } from '@match/entities/match.entity';
import { SeasonEntity } from '@season/entities/season.entity';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'journey' })
export class JourneyEntity {
  @PrimaryGeneratedColumn('uuid')
  journeyId: number;

  @OneToMany(() => MatchEntity, (match) => match.journey)
  matchs: MatchEntity[];

  @ManyToOne(() => SeasonEntity, (season) => season.journeys)
  season: SeasonEntity;
}
