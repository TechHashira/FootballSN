import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamRepository } from '@team/repositories/team.repository';
import { TournamentModule } from '@tournament/tournament.module';
import { SendNotificationsController } from './controllers/sendNotifications.controller';
import { NotificationRepository } from './repositories/notification.repository';
import { SendNotificationService } from './services/sendNotification.service';

@Module({
  imports: [
    TournamentModule,
    TypeOrmModule.forFeature([NotificationRepository, TeamRepository]),
  ],
  controllers: [SendNotificationsController],
  exports: [SendNotificationService],
  providers: [SendNotificationService],
})
export class NotificationModule {}
