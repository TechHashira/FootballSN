import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTournamentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  tournamentName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  timeOfEachHalf: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  maxOfPlayersOnCourtPerTeam: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  maxOfPlayersRegisteredPerTeam: number;
}
