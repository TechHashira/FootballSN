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
import { PlayerStatsEntity } from '.';

@Entity({ name: 'player' })
export class PlayerEntity {
  @PrimaryGeneratedColumn('uuid')
  playerId: string;

  @OneToMany(() => PlayerStatsEntity, (playerStats) => playerStats.player)
  player_stats: PlayerStatsEntity[];

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToMany(() => TournamentEntity)
  @JoinTable()
  tournaments: TournamentEntity[];
}
