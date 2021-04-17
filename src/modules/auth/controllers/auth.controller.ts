import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseTransformInterceptor } from 'src/interceptors/responseTransform.interceptor';
import { AdminService } from 'src/modules/admin/services/admin.service';
import { CoachService } from 'src/modules/coach/services/coach.service';
import { PlayerService } from 'src/modules/player/services/player.service';
import { RefereeService } from 'src/modules/referee/services/referee.service';
import { CreateAdminDto } from 'src/modules/user/dtos/creationalDtos/createAdminDto.dto';
import { CreateCoachDto } from 'src/modules/user/dtos/creationalDtos/createCoachDto.dto';
import { CreatePlayerDto } from 'src/modules/user/dtos/creationalDtos/createPlayerDto.dto';
import { CreateRefereeDto } from 'src/modules/user/dtos/creationalDtos/createRefereeDto.dto';
import { CreateSpectatorDto } from 'src/modules/user/dtos/creationalDtos/createSpectatorDto.dto';
import { UserService } from 'src/modules/user/services';
import { RefreshTokenDto } from '../dots/accessTokenDto.dto';
import { LogOutRequestDto } from '../dots/logOutRequest.dto';
import { JwtAuthGuard } from '../guards/accessToken.guard';
import { LocalAuthGuard } from '../guards/localAuth.guard';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Controller('v1/auth')
export class AuthController {
  constructor(
    private _adminService: AdminService,
    private _playerService: PlayerService,
    private _coachService: CoachService,
    private _userService: UserService,
    private _refereeService: RefereeService,
    private _authService: AuthService,
    private _tokenService: TokenService,
  ) {}

  @Post('admins')
  @UseInterceptors(ClassSerializerInterceptor, ResponseTransformInterceptor)
  async registerAdmin(@Body() createAdminDto: CreateAdminDto) {
    return await this._adminService.createAdmin(createAdminDto);
  }

  @Post('players')
  @UseInterceptors(ClassSerializerInterceptor, ResponseTransformInterceptor)
  async registerPlayer(@Body() createPlayerDto: CreatePlayerDto) {
    return await this._playerService.createPlayer(createPlayerDto);
  }

  @Post('coachs')
  @UseInterceptors(ClassSerializerInterceptor, ResponseTransformInterceptor)
  async registerCoach(@Body() createCoachDto: CreateCoachDto) {
    return this._coachService.createCoach(createCoachDto);
  }

  @Post('spectators')
  @UseInterceptors(ClassSerializerInterceptor, ResponseTransformInterceptor)
  async registerSpectator(@Body() createSpectatorDto: CreateSpectatorDto) {
    return this._userService.createUser(createSpectatorDto);
  }

  @Post('referees')
  @UseInterceptors(ClassSerializerInterceptor, ResponseTransformInterceptor)
  async registerReferee(@Body() createRefereDto: CreateRefereeDto) {
    return this._refereeService.createReferee(createRefereDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() { user }) {
    return await this._authService.login(user);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(
    @Body() logOutRequestDto: LogOutRequestDto,
    @Res() res: Response,
  ) {
    await this._authService.logout(logOutRequestDto);
    res
      .status(HttpStatus.OK)
      .json({
        code: HttpStatus.OK,
        message: 'Logout successfully',
      })
      .send();
  }

  @Post('refresh')
  async getAccessTokenFromRefreshToken(@Body() token: RefreshTokenDto) {
    return await this._tokenService.refresh(token);
  }
}
