import { CoachPropertiesDto } from '@coach/dtos/coachPropertys.dto';
import { ApiProperty } from '@nestjs/swagger';
import { TournamentDto } from '@tournament/dtos/tournament.dto';

export class TeamDto {
  @ApiProperty()
  readonly team_name: string;

  @ApiProperty()
  readonly teamId: string;

  @ApiProperty({ type: 'boolean', default: true })
  readonly available: boolean;

  @ApiProperty({ type: CoachPropertiesDto })
  readonly coach: CoachPropertiesDto;

  @ApiProperty({ type: TournamentDto })
  readonly tournament: TournamentDto;
}
