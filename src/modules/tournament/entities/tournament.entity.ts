import { AdminEntity } from '@admin/entities/admin.entity';
import { JourneyEntity } from '@journey/entities/journey.entity';
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

  @Column({ type: 'varchar' })
  invitation_code: string;

  @Column({ type: 'smallint' })
  timeOfEachHalf: number;

  @Column({ type: 'smallint' })
  maxOfPlayersOnCourtPerTeam: number;

  @Column({ type: 'smallint' })
  maxOfPlayersRegisteredPerTeam: number;

  @ManyToOne(() => AdminEntity, (admin) => admin.tournaments)
  @JoinColumn({ name: 'adminId' })
  admin: AdminEntity;

  @OneToMany(() => JourneyEntity, (journey) => journey.tournament)
  journeys: JourneyEntity[];

  @OneToMany(() => SeasonEntity, (season) => season.tournament)
  seasons: SeasonEntity[];

  @OneToMany(() => TeamEntity, (team) => team.tournament)
  teams: TeamEntity[];
}
