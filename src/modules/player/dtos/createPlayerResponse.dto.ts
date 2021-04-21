import { ApiProperty } from '@nestjs/swagger';
import { PlayerDto } from './player.dto';

export class CreatePlayerResponseDto {
  @ApiProperty({ type: PlayerDto })
  readonly data: PlayerDto;
}
