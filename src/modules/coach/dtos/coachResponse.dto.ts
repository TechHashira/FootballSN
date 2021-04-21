import { ApiProperty } from '@nestjs/swagger';
import { CoachDto } from './coach.dto';

export class CreateCoachResponseDto {
  @ApiProperty({ type: CoachDto })
  readonly data: CoachDto;
}
