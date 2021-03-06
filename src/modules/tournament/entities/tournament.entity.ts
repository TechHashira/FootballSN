import { AdminEntity } from '@admin/entities/admin.entity';
import { TournamentState } from '@common/constants';
import { SeasonEntity } from '@season/entities/season.entity';
import { TeamEntity } from '@team/entities/team.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tournament' })
export class TournamentEntity {
  @PrimaryGeneratedColumn('uuid')
  tournamentId: string;

  @Column({ type: 'varchar' })
  tournament_name: string;

  @Column({ type: 'enum', enum: TournamentState })
  tournament_state: TournamentState;

  @Column({ type: 'smallint' })
  timeOfEachHalf: number;

  @Column({ type: 'smallint' })
  maxOfPlayersOnCourtPerTeam: number;

  @Column({ type: 'smallint' })
  maxOfPlayersRegisteredPerTeam: number;

  @ManyToOne(() => AdminEntity, (admin) => admin.tournaments)
  @JoinColumn({ name: 'adminId' })
  admin: AdminEntity;

  @OneToMany(() => SeasonEntity, (season) => season.tournament)
  seasons: SeasonEntity[];

  @OneToMany(() => TeamEntity, (team) => team.tournament)
  teams: TeamEntity[];
}
