import { NewsEntity } from 'src/modules/notice/entities';
import { UserEntity } from 'src/modules/user/entities';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'likes' })
export class LikesEntity {
  @PrimaryGeneratedColumn('uuid')
  likeId: string;

  @CreateDateColumn({ type: 'timestamp without time zone', default: 'NOW()' })
  likeAt: Date;

  @ManyToOne(() => NewsEntity, (news) => news.likes)
  @JoinColumn({ name: 'newsId' })
  news: NewsEntity;

  @ManyToOne(() => UserEntity, (user) => user.likes)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
