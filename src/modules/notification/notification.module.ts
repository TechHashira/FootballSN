import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentModule } from '@tournament/tournament.module';
import { NotificationRepository } from './repositories/notification.repository';
import { SendNotificationService } from './services/sendNotification.service';

@Module({
  imports: [
    TournamentModule,
    TypeOrmModule.forFeature([NotificationRepository]),
  ],
  exports: [SendNotificationService],
  providers: [SendNotificationService],
})
export class NotificationModule {}
