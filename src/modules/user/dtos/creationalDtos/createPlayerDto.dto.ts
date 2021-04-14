import { Equals, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from 'src/common/constants';
import { CreateUserDto } from './createUser.dto';

export class CreatePlayerDto extends CreateUserDto {
  @IsNotEmpty()
  @IsEnum(Role)
  @Equals(Role[Role.PLAYER], { message: 'Role must to be PLAYER' })
  public roles: Role;
}
