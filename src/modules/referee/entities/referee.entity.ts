import { MatchEntity } from '@match/entities/match.entity';
import { UserEntity } from '@user/entities/user.entity';
import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'referee' })
export class RefereeEntity {
  @PrimaryGeneratedColumn('uuid')
  refereeId: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToMany(() => MatchEntity)
  @JoinTable()
  matches: MatchEntity[];
}
