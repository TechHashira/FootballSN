import { Role } from '@common/constants';
import { ApiProperty } from '@nestjs/swagger';
import { Equals, IsEnum, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './createUser.dto';

export class CreateCoachDto extends CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Role)
  @Equals(Role[Role.COACH], { message: 'Role must to be COACH' })
  public role: Role;
}
