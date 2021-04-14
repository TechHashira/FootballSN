import { Equals, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from 'src/common/constants';
import { CreateUserDto } from './createUser.dto';

export class CreateSpectatorDto extends CreateUserDto {
  @IsNotEmpty()
  @IsEnum(Role)
  @Equals(Role[Role.SPECTATOR], { message: 'Role must to be SPECTATOR' })
  public roles: Role;
}
