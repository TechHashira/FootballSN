import { Equals, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from 'src/common/constants';
import { CreateUserDto } from './createUser.dto';

export class CreateCoachDto extends CreateUserDto {
  @IsNotEmpty()
  @IsEnum(Role)
  @Equals(Role[Role.COACH], { message: 'Role must to be COACH' })
  public roles: Role;
}
