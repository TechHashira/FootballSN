import { ApiProperty } from '@nestjs/swagger';
import { RefereeDto } from './referee.dto';

export class CreateRefereeResponseDto {
  @ApiProperty({ type: RefereeDto })
  readonly data: RefereeDto;
}
