import { AdminEntity } from '@admin/entities/admin.entity';
import { LikesEntity } from '@like/entities/like.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NewsWallEntity } from './newsWall.entity';

@Entity({ name: 'news' })
export class NewsEntity {
  @PrimaryGeneratedColumn('uuid')
  newsId: string;

  @CreateDateColumn({ type: 'timestamp without time zone', default: 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    onUpdate: 'NOW()',
    nullable: true,
  })
  updatedAt: Date;

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
