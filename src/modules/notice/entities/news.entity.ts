import { AdminEntity } from 'src/modules/admin/entities';
import { LikesEntity } from 'src/modules/like/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NewsWallEntity } from './newsWall.entity';

@Entity({ name: 'news' })
export class NewsEntity {
  @PrimaryGeneratedColumn('uuid')
  newsId: string;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'timestamptz', nullable: true, default: null })
  updatedAt?: Date;

  @Column({ type: 'varchar' })
  text: string;

  @Column({ type: 'varchar' })
  imgPath: string;

  @OneToOne(() => AdminEntity)
  @JoinColumn({ name: 'adminId' })
  admin: AdminEntity;

  @ManyToOne(() => NewsWallEntity, (newswall) => newswall.news)
  @JoinColumn({ name: 'news_wall_id' })
  newsWall: NewsWallEntity;

  @OneToMany(() => LikesEntity, (like) => like.news)
  likes: LikesEntity[];
}
