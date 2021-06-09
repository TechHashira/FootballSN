import { Notification } from '@common/constants';
import { ApiProperty } from '@nestjs/swagger';

export class NotificationDto {
  @ApiProperty({ type: 'string' })
  readonly notificationId: string;

  @ApiProperty({ type: 'string' })
  readonly title: string;

  @ApiProperty({ type: 'string' })
  readonly message: string;

  @ApiProperty({ type: Date })
  readonly readAt: Date;

  @ApiProperty({ type: Date })
  readonly sentAt: Date;

  @ApiProperty({ type: 'enum', enum: Notification })
  readonly type: Notification;

  @ApiProperty({ type: 'string' })
  readonly subjectId: string;

  @ApiProperty({ type: 'string' })
  readonly subjectObjectiveId: string;

  @ApiProperty({ type: Date })
  readonly createdAt: Date;

  @ApiProperty({ type: 'boolean' })
  readonly seen: boolean;
}
