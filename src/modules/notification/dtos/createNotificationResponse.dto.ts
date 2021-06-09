import { ApiProperty } from '@nestjs/swagger';
import { NotificationDto } from './notification.dto';

export class CreateNotficationResponseDto {
  @ApiProperty({ type: NotificationDto })
  readonly data: NotificationDto;
}
