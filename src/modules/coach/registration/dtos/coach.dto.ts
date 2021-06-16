import { ApiProperty } from '@nestjs/swagger';
import { PlayerDto } from '@player/registration/dtos/player.dto';

export class CoachDto {
  @ApiProperty({ type: PlayerDto })
  readonly player: PlayerDto;

  @ApiProperty({ type: 'string' })
  readonly coachId: string;
}
