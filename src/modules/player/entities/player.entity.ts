import { ContractState } from 'src/common/constants/contractState.constant';
import { TeamEntity } from 'src/modules/team/entities';
import { UserEntity } from 'src/modules/user/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlayerStatsEntity } from '.';

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
