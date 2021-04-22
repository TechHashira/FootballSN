import { ApiProperty } from '@nestjs/swagger';
import { TournamentDto } from 'src/modules/tournament/dtos/tournament.dto';

export class SeasonDto {
  @ApiProperty()
  readonly pre_season_init_date: Date;

  @ApiProperty()
  readonly pre_season_final_date: Date;

  @ApiProperty()
  readonly official_season_init_date: Date;

  @ApiProperty()
  readonly official_season_final_date: Date;

  @ApiProperty()
  seasonId: string;

  @ApiProperty()
  seasonState: boolean;

  @ApiProperty({ type: TournamentDto })
  tournament: TournamentDto;
}
