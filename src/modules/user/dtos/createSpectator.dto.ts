import { UserDto } from '@auth/dots/responseDtos/userDto.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSpectatorResponseDto {
  @ApiProperty({ type: UserDto })
  readonly data: UserDto;
}
