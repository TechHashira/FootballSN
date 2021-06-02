import { NotificationEntity } from '@notification/entities/notification.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(NotificationEntity)
export class NotificationRepository extends Repository<NotificationEntity> {}
