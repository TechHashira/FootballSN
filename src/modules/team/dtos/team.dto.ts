import { ApiProperty } from '@nestjs/swagger';
import { CoachPropertiesDto } from 'src/modules/coach/dtos/coachPropertys.dto';
import { TournamentDto } from 'src/modules/tournament/dtos/tournament.dto';

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
