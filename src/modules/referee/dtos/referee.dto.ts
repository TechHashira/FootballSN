import { ApiProperty } from '@nestjs/swagger';
import { PlayerDto } from 'src/modules/player/dtos/player.dto';

export class RefereeDto {
  @ApiProperty({ type: PlayerDto })
  readonly player: PlayerDto;

  @ApiProperty()
  readonly refereeId: string;
}
