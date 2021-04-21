import { MatchHistoryEntity } from 'src/modules/match/entities/matchHistory.entity';
import { PlayerEntity } from 'src/modules/player/entities';
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
