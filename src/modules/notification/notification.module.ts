import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeasonModule } from '@season/season.module';
import { TeamRepository } from '@team/repositories/team.repository';
import { TeamModule } from '@team/team.module';
import { TournamentModule } from '@tournament/tournament.module';
import { UserModule } from '@user/user.module';
import { AcceptNotificationsController } from './controllers/accepNotifications.controller';
import { GetNotificationsController } from './controllers/getNotifications.controller';
import { SendNotificationsController } from './controllers/sendNotifications.controller';
import { NotificationRepository } from './repositories/notification.repository';
import { GetNotificationsService } from './services/getNotification.service';
import { GetOwnersService } from './services/getOwners.service';
import { ReactionNotificationService } from './services/reactionNotification.service';
import { SendNotificationService } from './services/sendNotification.service';

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
