import { ApiProperty } from '@nestjs/swagger';
import { SeasonDto } from './season.dto';

export class CreateSeasonResponseDto {
  @ApiProperty({ type: SeasonDto })
  readonly data: SeasonDto;
}
