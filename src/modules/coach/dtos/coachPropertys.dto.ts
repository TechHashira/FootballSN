import { ApiProperty } from '@nestjs/swagger';

export class CoachPropertiesDto {
  @ApiProperty()
  readonly coachId: string;

  @ApiProperty()
  readonly playerId: string;
}
