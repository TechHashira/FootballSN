import { AdminEntity } from 'src/modules/admin/entities';
import { JourneyEntity } from 'src/modules/journey/entities';
import { RulesEntity } from 'src/modules/rules/entities';
import { SeasonEntity } from 'src/modules/season/entities/season.entity';
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

  @Column({ type: 'varchar' })
  invitation_code: string;

  @ManyToOne(() => AdminEntity, (admin) => admin.tournaments)
  @JoinColumn({ name: 'adminId' })
  admin: AdminEntity;

  @OneToMany(() => JourneyEntity, (journey) => journey.tournament)
  journeys: JourneyEntity[];

  @OneToMany(() => RulesEntity, (rules) => rules.tournament)
  rules: RulesEntity[];

  @OneToMany(() => SeasonEntity, (season) => season.tournament)
  seasons: SeasonEntity[];
}
