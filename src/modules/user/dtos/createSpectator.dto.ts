import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/modules/auth/dots/responseDtos/userDto.dto';

export class CreateSpectatorResponseDto {
  @ApiProperty({ type: UserDto })
  readonly data: UserDto;
}
