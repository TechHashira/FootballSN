import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, Max, Min } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(3, 25)
  team_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(3, 100)
  invitation_code: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(3, 100)
  tournamentId: string;
}
