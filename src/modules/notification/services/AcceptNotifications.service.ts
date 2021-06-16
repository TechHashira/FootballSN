import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '@notification/repositories/notification.repository';
import { SearchUserService } from '@user/registration/services/searchUser.service';

@Injectable()
export class AllowtNotificationsService {
  constructor(
    private readonly _notificationRepository: NotificationRepository,
    private _searchUserService: SearchUserService,
  ) {}
}
