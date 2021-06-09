import { IUserRequest } from '@auth/interfaces/userRequest.interface';
import { Injectable } from '@nestjs/common';
import { NotificationEntity } from '@notification/entities/notification.entity';
import { IPaginationOptions } from '@notification/interfaces/IPaginationOptions';
import { NotificationRepository } from '@notification/repositories/notification.repository';

@Injectable()
export class GetNotificationsService {
  constructor(
    private readonly _notificationRepository: NotificationRepository,
  ) {}

  async getNotificationsByUserId(
    { userId }: IUserRequest,
    { limit, page }: IPaginationOptions,
  ): Promise<Array<NotificationEntity>> {
    return await this._notificationRepository.find({
      where: { userId },
      take: limit,
      skip: page,
    });
  }
}
