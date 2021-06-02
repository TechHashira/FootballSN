import { CoachPropertiesDto } from '@coach/dtos/coachPropertys.dto';
import { ApiProperty } from '@nestjs/swagger';

export class TeamDto {
  @ApiProperty()
  readonly team_name: string;

  @ApiProperty()
  readonly teamId: string;

  @ApiProperty({ type: 'boolean', default: true })
  readonly available: boolean;

  @ApiProperty({ type: CoachPropertiesDto })
  readonly coach: CoachPropertiesDto;
}
