import { TournamentEntity } from 'src/modules/tournament/entities/tournament.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlayerEntity } from '.';

@Entity({ name: 'player_stats' })
export class PlayerStatsEntity {
  @PrimaryGeneratedColumn('uuid')
  player_stats_id: string;

  @Column()
  goals: number;

  @Column()
  assists: number;

  @Column()
  yellow_cards: number;

  @Column()
  red_cards: number;

  @ManyToOne(() => PlayerEntity, (player) => player.player_stats)
  @JoinColumn({ name: 'playerId' })
  player: PlayerEntity;

  @OneToOne(() => TournamentEntity)
  @JoinColumn({ name: 'tournamentId' })
  tournament: TournamentEntity;
}
