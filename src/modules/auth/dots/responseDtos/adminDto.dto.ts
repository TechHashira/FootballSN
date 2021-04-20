import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './userDto.dto';

export class AdminDto {
  @ApiProperty({ type: 'string' })
  adminId: string;

  @ApiProperty({ type: UserDto })
  user: UserDto;
}
