import { NewsEntity } from 'src/modules/notice/entities';
import { UserEntity } from 'src/modules/user/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'likes' })
export class LikesEntity {
  @PrimaryGeneratedColumn('uuid')
  likeId: string;

  @Column({ type: 'timestamptz' })
  likeAt: Date;

  @ManyToOne(() => NewsEntity, (news) => news.likes)
  @JoinColumn({ name: 'newsId' })
  news: NewsEntity;

  @ManyToOne(() => UserEntity, (user) => user.likes)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
