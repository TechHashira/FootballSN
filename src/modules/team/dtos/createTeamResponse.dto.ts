import { ApiProperty } from '@nestjs/swagger';
import { TeamDto } from './team.dto';

export class CreateTeamResponseDto {
  @ApiProperty({ type: TeamDto })
  readonly data: TeamDto;
}
