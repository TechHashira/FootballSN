import { Role } from '@common/constants';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  roles: Role;

  @ApiProperty()
  profilePath: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  available: boolean;
}
