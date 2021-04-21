import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateTournamentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tournament_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(10)
  @Max(45)
  timeOfEachHalf: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(3)
  @Max(11)
  maxOfPlayersOnCourtPerTeam: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(6)
  @Max(20)
  maxOfPlayersRegisteredPerTeam: number;
}
