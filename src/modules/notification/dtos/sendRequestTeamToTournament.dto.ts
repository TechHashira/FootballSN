import { ApiProperty } from '@nestjs/swagger';

export class SendRequestTeamToTournamentDto {
  @ApiProperty()
  teamId: string;
  @ApiProperty()
  tournamentId: string;
}
