import { ApiProperty } from '@nestjs/swagger';
import { CreateTournamentDto } from './createTournament.dto';

export class CreateTournamentResponseDto {
  @ApiProperty({ type: CreateTournamentDto })
  readonly data: CreateTournamentDto;
}
