import { ApiProperty } from '@nestjs/swagger';

export class CreateReactionNotificationDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  notificationId: string;
}
