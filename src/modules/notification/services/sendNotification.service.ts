import { IUserRequest } from '@auth/interfaces/userRequest.interface';
import { Notification } from '@common/constants';
import { CreatedFailedException } from '@exceptions/createdFailed.exception';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SendNotificationMetadataDto } from '@notification/dtos/sendNotification.dto';
import { NotificationEntity } from '@notification/entities/notification.entity';
import { NotificationRepository } from '@notification/repositories/notification.repository';
import { TeamRepository } from '@team/repositories/team.repository';
import { ValidationTournamentService } from '@tournament/services/validations.tournament.service';

@Injectable()
export class SendNotificationService {
  constructor(
    private readonly _notificationRepository: NotificationRepository,
    private readonly _teamRepository: TeamRepository,
    private _validationTournamentService: ValidationTournamentService,
  ) {}

  async createNotificationTeamToTournament(
    { subjectId, subjectObjectiveId, message }: SendNotificationMetadataDto,
    { userId }: IUserRequest,
  ): Promise<NotificationEntity> {
    try {
      const isTournamentPublic = await this._validationTournamentService.checkIfTournamentIsPublic(
        subjectObjectiveId,
      );

      if (!isTournamentPublic) {
        throw new UnauthorizedException();
      }

      const { team_name } = await this._teamRepository.findOne({
        where: { teamId: subjectId },
      });

      if (!team_name) {
        throw new CreatedFailedException();
      }

      const title = team_name;

      const notification = this._notificationRepository.create({
        message,
        title,
        type: Notification.TEAM2TOURNAMENT,
        userId,
      });
      await this._notificationRepository.save<NotificationEntity>(notification);

      return notification;
    } catch (erro) {
      throw new CreatedFailedException(erro);
    }
  }
}
