import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SendNotificationMetadataDto {
  @ApiProperty()
  @IsNotEmpty()
  subjectId: string;

  @ApiProperty()
  @IsNotEmpty()
  subjectObjectiveId: string;

  @ApiProperty()
  @IsNotEmpty()
  message: string;
}
