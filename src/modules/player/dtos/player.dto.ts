import { UserDto } from '@auth/dots/responseDtos/userDto.dto';
import { ContractState } from '@common/constants/contractState.constant';
import { ApiProperty } from '@nestjs/swagger';

export class PlayerDto {
  @ApiProperty({ type: UserDto })
  user: UserDto;

  @ApiProperty()
  playerId: string;

  @ApiProperty({ type: 'string', default: ContractState.FREE })
  contractState: ContractState;

  @ApiProperty({ type: 'string', default: null })
  teamId: string;
}
