import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ResponseTransformInterceptor } from 'src/interceptors/responseTransform.interceptor';
import { AdminService } from 'src/modules/admin/services/admin.service';
import { CoachService } from 'src/modules/coach/services/coach.service';
import { PlayerService } from 'src/modules/player/services/player.service';
import { RefereeService } from 'src/modules/referee/services/referee.service';
import { CreateUserDto } from 'src/modules/user/dtos';
import { UserService } from 'src/modules/user/services';

@Controller('v1/auth')
export class AuthController {
  constructor(
    private _adminService: AdminService,
    private _playerService: PlayerService,
    private _coachService: CoachService,
    private _userService: UserService,
    private _refereeService: RefereeService,
  ) {}

  @Post('admins')
  @UseInterceptors(ClassSerializerInterceptor, ResponseTransformInterceptor)
  async registerAdmin(@Body() createUserDto: CreateUserDto) {
    console.log('dto =>', createUserDto);
    return await this._adminService.createAdmin(createUserDto);
  }

  @Post('players')
  @UseInterceptors(ClassSerializerInterceptor, ResponseTransformInterceptor)
  async registerPlayer(@Body() createUserDto: CreateUserDto) {
    return await this._playerService.createPlayer(createUserDto);
  }

  @Post('coachs')
  @UseInterceptors(ClassSerializerInterceptor, ResponseTransformInterceptor)
  async registerCoach(@Body() createUserDto: CreateUserDto) {
    return this._coachService.createCoach(createUserDto);
  }

  @Post('spectators')
  @UseInterceptors(ClassSerializerInterceptor, ResponseTransformInterceptor)
  async registerSpectator(@Body() createUserDto: CreateUserDto) {
    return this._userService.createUser(createUserDto);
  }

  @Post('referees')
  @UseInterceptors(ClassSerializerInterceptor, ResponseTransformInterceptor)
  async registerReferee(@Body() createUserDto: CreateUserDto) {
    return this._refereeService.createReferee(createUserDto);
  }
}
