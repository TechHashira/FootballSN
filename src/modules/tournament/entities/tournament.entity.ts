import { AdminEntity } from 'src/modules/admin/entities';
import { JourneyEntity } from 'src/modules/journey/entities';
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

  @Column()
  tournament_name: string;

  @Column({ type: 'timestamptz', nullable: true })
  init_date: Date;

  @Column({ type: 'timestamptz', nullable: true })
  final_date: Date;

  @ManyToOne(() => AdminEntity, (admin) => admin.tournaments)
  @JoinColumn({ name: 'adminId' })
  admin: AdminEntity;

  @OneToMany(() => JourneyEntity, (journey) => journey.tournament)
  journeys: JourneyEntity[];
}
