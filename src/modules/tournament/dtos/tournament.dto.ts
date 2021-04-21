import { ApiProperty } from '@nestjs/swagger';

export class TournamentDto {
  @ApiProperty()
  readonly tournamentId: string;

  @ApiProperty()
  readonly tournament_name: string;

  @ApiProperty()
  readonly invitation_code: string;

  @ApiProperty()
  readonly timeOfEachHalf: number;

  @ApiProperty()
  readonly maxOfPlayersOnCourtPerTeam: number;

  @ApiProperty()
  readonly maxOfPlayersRegisteredPerTeam: number;
}
