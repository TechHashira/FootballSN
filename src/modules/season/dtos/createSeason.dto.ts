import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

export class CreateSeasonDto {
  @ApiProperty()
  @IsDate()
  pre_season_init_date: Date;

  @ApiProperty()
  @IsDate()
  pre_season_final_date: Date;

  @ApiProperty()
  tournamentId: string;
}
