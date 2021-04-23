import { Role } from '@common/constants';
import { ApiProperty } from '@nestjs/swagger';
import { Equals, IsEnum, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './createUser.dto';

export class CreateAdminDto extends CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Role)
  @Equals(Role[Role.ADMIN], { message: 'Role must to be ADMIN' })
  public role: Role;
}
