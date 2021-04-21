import { ApiProperty } from '@nestjs/swagger';
import { ContractState } from 'src/common/constants/contractState.constant';
import { UserDto } from 'src/modules/auth/dots/responseDtos/userDto.dto';

export class PlayerDto {
  @ApiProperty({ type: UserDto })
  user: UserDto;

  @ApiProperty()
  playerId: string;

  @ApiProperty({ type: ContractState })
  contractState: ContractState;
}