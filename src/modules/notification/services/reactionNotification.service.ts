import { Notification } from '@common/constants';
import { CreatedFailedException } from '@exceptions/createdFailed.exception';
import { Injectable } from '@nestjs/common';
import { CreateReactionNotificationDto } from '@notification/dtos/CreateReactionNotification.dto';
import { NotificationEntity } from '@notification/entities/notification.entity';
import { NotificationRepository } from '@notification/repositories/notification.repository';
import { TeamTournamentRegisterService } from '@team/services/teamTournamentRegister.service';
import { SearchUserService } from '@user/services/searchUser.service';
import { getConnection } from 'typeorm';

@Injectable()
export class ReactionNotificationService {
  constructor(
    private readonly _notificationRepository: NotificationRepository,
    private _searchUserService: SearchUserService,
    private _teamTournamentRegisterService: TeamTournamentRegisterService,
  ) {}

  private async createReactionNotification(
    message: string,
    title: string,
    userRecieverId: string,
  ): Promise<NotificationEntity> {
    const notification = this._notificationRepository.create({
      message,
      title,
      type: Notification.REACTION,
      userId: userRecieverId,
    });

    await this._notificationRepository.save(notification);
    return notification;
  }

  async teamAllowedOnTournamentNotification({
    message,
    title,
    notificationId,
  }: CreateReactionNotificationDto) {
    try {
      const {
        subjectId,
        subjectObjectiveId,
      } = await this._notificationRepository.findOne({
        where: { notificationId, type: Notification.TEAM2TOURNAMENT },
      });

      if (!subjectId) {
        throw new CreatedFailedException(`Notification doesn't exist`);
      }

      const userId = await this._searchUserService.getUserIdByTeamId(subjectId);

      if (!userId) {
        throw new CreatedFailedException(`User doesn't exist`);
      }

      const reactionNotification = await this.createReactionNotification(
        message,
        title,
        userId,
      );

      await this._teamTournamentRegisterService.registerTeamOnTournament(
        subjectId,
        subjectObjectiveId,
      );

      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(NotificationEntity)
        .where('notificationId= :notificationId', { notificationId })
        .execute();

      return reactionNotification;
    } catch (error) {
      throw new CreatedFailedException(error);
    }
  }
}
