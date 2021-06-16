import { TournamentState } from '@common/constants';
import { ApiProperty } from '@nestjs/swagger';

export class TournamentDto {
  @ApiProperty()
  readonly tournamentId: string;

  @ApiProperty()
  readonly tournament_name: string;

  @ApiProperty({ type: 'enum', enum: TournamentState })
  readonly private: TournamentState;

  @ApiProperty()
  readonly timeOfEachHalf: number;

  @ApiProperty()
  readonly maxOfPlayersOnCourtPerTeam: number;

  @ApiProperty()
  readonly maxOfPlayersRegisteredPerTeam: number;
}
