import { ApiProperty } from '@nestjs/swagger';
import { TournamentDto } from './tournament.dto';

export class CreateTournamentResponseDto {
  @ApiProperty({ type: TournamentDto })
  readonly data: TournamentDto;
}
