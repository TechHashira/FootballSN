import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/common/constants';

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
