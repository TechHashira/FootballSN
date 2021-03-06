import { SeasonEntity } from '@season/entities/season.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlayerEntity } from './player.entity';

@Entity({ name: 'player_stats' })
export class PlayerStatsEntity {
  @PrimaryGeneratedColumn('uuid')
  player_stats_id: string;

  @Column({ type: 'smallint' })
  goals: number;

  @Column({ type: 'smallint' })
  assists: number;

  @Column({ type: 'smallint' })
  yellow_cards: number;

  @Column({ type: 'smallint' })
  red_cards: number;

  @ManyToOne(() => PlayerEntity, (player) => player.player_stats)
  @JoinColumn({ name: 'playerId' })
  player: PlayerEntity;

  @OneToOne(() => SeasonEntity)
  @JoinColumn({ name: 'seasonId' })
  season: SeasonEntity;
}
