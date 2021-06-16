import { Notification } from '@common/constants';
import { CreatedFailedException } from '@exceptions/createdFailed.exception';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SendNotificationMetadataDto } from '@notification/dtos/sendNotification.dto';
import { NotificationEntity } from '@notification/entities/notification.entity';
import { NotificationRepository } from '@notification/repositories/notification.repository';
import { SeasonValidationService } from '@season/registration/services/season.validation.service';
import { TeamRepository } from '@team/repositories/team.repository';
import { ValidationTournamentService } from '@tournament/registration/services/validations.tournament.service';
import { GetOwnersService } from './getOwners.service';

@Injectable()
export class SendNotificationService {
  constructor(
    private _validationTournamentService: ValidationTournamentService,
    private _getOwnersService: GetOwnersService,
    private readonly _teamRepository: TeamRepository,
    private readonly _notificationRepository: NotificationRepository,
    private _seasonValidtionService: SeasonValidationService,
  ) {}

  async createNotificationTeamToTournament({
    subjectId,
    subjectObjectiveId,
    message,
  }: SendNotificationMetadataDto): Promise<NotificationEntity> {
    try {
      const isTournamentPublic = await this._validationTournamentService.checkIfTournamentIsPublic(
        subjectObjectiveId,
      );

      const seasonState = await this._seasonValidtionService.validIfExistCurrentSeasonByTournament(
        subjectObjectiveId,
      );

      if (!isTournamentPublic) {
        throw new UnauthorizedException();
      }

      if (!seasonState) {
        throw new UnauthorizedException('Tournamet have a season in progrees');
      }

      const { team_name } = await this._teamRepository.findOne({
        where: { teamId: subjectId },
      });

      if (!team_name) {
        throw new CreatedFailedException();
      }

      const userIdTarget = await this._getOwnersService.getUserIdByTournamentId(
        subjectObjectiveId,
      );

      const notification = this._notificationRepository.create({
        message,
        title: team_name,
        type: Notification.TEAM2TOURNAMENT,
        userId: userIdTarget,
        subjectId,
        subjectObjectiveId,
      });
      await this._notificationRepository.save<NotificationEntity>(notification);

      return notification;
    } catch (erro) {
      throw new CreatedFailedException(erro);
    }
  }
}
