import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class CreateUserResponseDto {
  @ApiProperty({ type: UserDto })
  readonly data: UserDto;
}
