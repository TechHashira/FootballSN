import { Equals, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from 'src/common/constants';
import { CreateUserDto } from './createUser.dto';

export class CreateAdminDto extends CreateUserDto {
  @IsNotEmpty()
  @IsEnum(Role)
  @Equals(Role[Role.ADMIN], { message: 'Role must to be ADMIN' })
  public roles: Role;
}
