import { ApiProperty } from '@nestjs/swagger';
import { NotificationDto } from './notification.dto';

export class GetNotficationResponseDto {
  @ApiProperty({ type: NotificationDto, isArray: true })
  readonly data: NotificationDto[];
}
