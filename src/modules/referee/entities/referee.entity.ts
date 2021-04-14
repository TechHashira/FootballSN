import { MatchHistoryEntity } from 'src/modules/match/entities/matchHistory.entity';
import { TournamentEntity } from 'src/modules/tournament/entities/tournament.entity';
import { UserEntity } from 'src/modules/user/entities';
import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
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

  @ManyToMany(() => TournamentEntity)
  @JoinTable()
  tournaments: TournamentEntity[];
}
