import { ApiProperty } from '@nestjs/swagger';
import { PlayerDto } from '@player/dtos/player.dto';

export class CoachDto {
  @ApiProperty({ type: PlayerDto })
  readonly player: PlayerDto;

  @ApiProperty({ type: 'string' })
  readonly coachId: string;
}
