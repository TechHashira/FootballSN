import { ApiProperty } from '@nestjs/swagger';
import { AdminDto } from './adminDto.dto';

export class CreateAdminResponseDto {
  @ApiProperty({ type: AdminDto })
  readonly data: AdminDto;
}
