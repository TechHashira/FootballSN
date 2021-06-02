import { IUserRequest } from '@auth/interfaces/userRequest.interface';
import { CreatedFailedException } from '@exceptions/createdFailed.exception';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SendNotificationMetadataDto } from '@notification/dtos/sendNotification.dto';
import { NotificationEntity } from '@notification/entities/notification.entity';
import { NotificationRepository } from '@notification/repositories/notification.repository';
import { ValidationTournamentService } from '@tournament/services/validations.tournament.service';

@Injectable()
export class SendNotificationService {
  constructor(
    private readonly _notificationRepository: NotificationRepository,
    private _validationTournamentService: ValidationTournamentService,
  ) {}

  async createNotificationTeamToTournament(
    { subjectObjectiveId, message }: SendNotificationMetadataDto,
    { userId }: IUserRequest,
  ): Promise<NotificationEntity> {
    try {
      const isTournamentPublic = await this._validationTournamentService.checkIfTournamentIsPublic(
        subjectObjectiveId,
      );

      if (!isTournamentPublic) {
        throw new UnauthorizedException();
      }

      const notification = this._notificationRepository.create({
        message,
        userId,
      });
      await this._notificationRepository.save<NotificationEntity>(notification);

      return notification;
    } catch ({ message }) {
      throw new CreatedFailedException();
    }
  }
}
