import { ContractState } from '@common/constants/contractState.constant';
import { TeamEntity } from '@team/entities/team.entity';
import { UserEntity } from '@user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlayerStatsEntity } from './playerStats.entity';

@Entity({ name: 'player' })
export class PlayerEntity {
  @PrimaryGeneratedColumn('uuid')
  playerId: string;

  @Column({ type: 'enum', enum: ContractState, default: ContractState.FREE })
  contractState: ContractState;

  @OneToMany(() => PlayerStatsEntity, (playerStats) => playerStats.player)
  player_stats: PlayerStatsEntity[];

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column('uuid')
  userId: string;

  @ManyToOne(() => TeamEntity, (team) => team.players)
  @JoinColumn({ name: 'teamId' })
  team: TeamEntity;

  @Column({ type: 'uuid', nullable: true })
  teamId: string;
}
