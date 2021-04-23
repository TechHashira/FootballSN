import { Role } from '@common/constants';
import { ApiProperty } from '@nestjs/swagger';
import { Equals, IsEnum, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './createUser.dto';

export class CreateSpectatorDto extends CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Role)
  @Equals(Role[Role.SPECTATOR], { message: 'Role must to be SPECTATOR' })
  public role: Role;
}
