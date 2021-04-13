import { TournamentEntity } from 'src/modules/tournament/entities/tournament.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'rules' })
export class RulesEntity {
  @PrimaryGeneratedColumn('uuid')
  rulesId: string;

  @Column({ type: 'smallint', nullable: true })
  timeOfEachHalf: number;

  @Column({ type: 'smallint', nullable: true })
  maxOfplayersByMatch: number;

  @ManyToOne(() => TournamentEntity, (tournament) => tournament.rules)
  tournament: TournamentEntity;
}
