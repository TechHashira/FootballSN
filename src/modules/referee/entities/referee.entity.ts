import { MatchHistoryEntity } from '@match/entities/matchHistory.entity';
import { PlayerEntity } from '@player/entities/player.entity';
import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'referee' })
export class RefereeEntity {
  @PrimaryGeneratedColumn('uuid')
  refereeId: string;

  @OneToMany(() => MatchHistoryEntity, (matchHistory) => matchHistory.referee)
  matchsHistory: MatchHistoryEntity[];

  @OneToOne(() => PlayerEntity)
  @JoinColumn({ name: 'playerId' })
  player: PlayerEntity;
}
