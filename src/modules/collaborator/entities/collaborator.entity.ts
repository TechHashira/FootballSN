import { MatchEntity } from '@match/entities/match.entity';
import { UserEntity } from '@user/entities/user.entity';
import {
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'collaborator' })
export class CollaboratorEntity {
  @PrimaryGeneratedColumn('uuid')
  collaboratorId: string;

  @OneToOne(() => UserEntity)
  user: UserEntity;

  @ManyToMany(() => MatchEntity)
  @JoinTable()
  matches: MatchEntity[];
}
