import { ResponseTransformInterceptor } from '@interceptors/responseTransform.interceptor';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { CreateUserDto } from '@user/dtos/createUser.dto';
import { CreateUserResponseDto } from '@user/dtos/createUserResponse.dto';
import { UserEntity } from '@user/entities/user.entity';
import { UserService } from '@user/services/user.service';

@Controller('register')
export class UsersRegisterController {
  constructor(private _userService: UserService) {}
  @Post('users')
  @ApiTags('Register')
  @UseInterceptors(ResponseTransformInterceptor, ClassSerializerInterceptor)
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    type: CreateUserResponseDto,
    description: 'Successfully created',
  })
  async registerUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    return await this._userService.createUser(createUserDto);
  }
}
