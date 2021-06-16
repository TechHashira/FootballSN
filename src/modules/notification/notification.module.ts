import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeasonModule } from '@season/registration/season.module';
import { TeamModule } from '@team/registration/team.module';
import { TeamRepository } from '@team/repositories/team.repository';
import { TournamentModule } from '@tournament/registration/tournament.module';
import { UserModule } from '@user/registration/user.module';
import { AcceptNotificationsController } from './controllers/accepNotifications.controller';
import { GetNotificationsController } from './controllers/getNotifications.controller';
import { SendNotificationsController } from './controllers/sendNotifications.controller';
import { NotificationRepository } from './repositories/notification.repository';
import { GetNotificationsService } from './services/getNotification.service';
import { GetOwnersService } from './services/getOwners.service';
import { ReactionNotificationService } from './services/reactionNotification.service';
import { SendNotificationService } from './services/sendNotificationTeamToTournament.service';

@Module({
  imports: [
    TournamentModule,
    TeamModule,
    SeasonModule,
    UserModule,
    TypeOrmModule.forFeature([NotificationRepository, TeamRepository]),
  ],
  controllers: [
    SendNotificationsController,
    GetNotificationsController,
    AcceptNotificationsController,
  ],
  exports: [SendNotificationService, GetOwnersService, GetNotificationsService],
  providers: [
    SendNotificationService,
    GetOwnersService,
    GetNotificationsService,
    ReactionNotificationService,
  ],
})
export class NotificationModule {}
