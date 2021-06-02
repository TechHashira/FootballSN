import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class SeasonDatesDto {
  @ApiProperty()
  @IsDateString()
  pre_season_init_date: Date;

  @ApiProperty()
  @IsDateString()
  pre_season_final_date: Date;
}

export class CreateSeasonDto extends SeasonDatesDto {
  @ApiProperty()
  tournamentId: string;
}
