import { TeamEntity } from '@team/entities/team.entity';
import { UserEntity } from '@user/entities/user.entity';
import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'coach' })
export class CoachEntity {
  @PrimaryGeneratedColumn('uuid')
  coachId: string;

  @OneToOne(() => UserEntity)
  user: UserEntity;

  @OneToMany(() => TeamEntity, (team) => team.coach)
  teams: TeamEntity[];
}
