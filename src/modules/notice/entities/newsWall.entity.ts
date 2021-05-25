import { TournamentEntity } from '@tournament/entities/tournament.entity';
import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NewsEntity } from './news.entity';

@Entity({ name: 'news_wall' })
export class NewsWallEntity {
  @PrimaryGeneratedColumn('uuid')
  news_wall_id: string;

  @OneToOne(() => TournamentEntity)
  @JoinColumn({ name: 'tournamentId' })
  tournament: TournamentEntity;

  @OneToMany(() => NewsEntity, (news) => news.newsWall)
  news: NewsEntity[];
}
