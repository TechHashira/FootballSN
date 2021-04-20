import { ApiProperty } from '@nestjs/swagger';

export class TournamentDto {
  @ApiProperty()
  tournamentId: string;

  @ApiProperty()
  tournament_name: string;

  @ApiProperty()
  invitation_code: string;

  @ApiProperty()
  timeOfEachHalf: number;

  @ApiProperty()
  maxOfPlayersOnCourtPerTeam: number;

  @ApiProperty()
  maxOfPlayersRegisteredPerTeam: number;
}
