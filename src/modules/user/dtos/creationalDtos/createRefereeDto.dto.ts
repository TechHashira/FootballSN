import { Equals, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from 'src/common/constants';
import { CreateUserDto } from './createUser.dto';

export class CreateRefereeDto extends CreateUserDto {
  @IsNotEmpty()
  @IsEnum(Role)
  @Equals(Role[Role.REFEREE], { message: 'Role must to be REFEREE' })
  public roles: Role;
}
