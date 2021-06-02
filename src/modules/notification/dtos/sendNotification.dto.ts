import { ApiProperty } from '@nestjs/swagger';

export class SendNotificationMetadataDto {
  @ApiProperty()
  subjectId: string;

  @ApiProperty()
  subjectObjectiveId: string;

  @ApiProperty()
  message: string;
}
