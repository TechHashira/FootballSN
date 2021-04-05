import { TournamentEntity } from 'src/modules/tournament/entities/tournament.entity';
import { UserEntity } from 'src/modules/user/entities';
import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'admin' })
export class AdminEntity {
  @PrimaryGeneratedColumn('uuid')
  adminId: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @OneToMany(() => TournamentEntity, (tournament) => tournament.admin)
  tournaments: TournamentEntity[];
}
