import { MatchHistoryEntity } from 'src/modules/match/entities/matchHistory.entity';
import { UserEntity } from 'src/modules/user/entities';
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

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
