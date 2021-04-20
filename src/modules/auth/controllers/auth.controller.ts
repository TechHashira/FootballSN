import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ResponseTransformInterceptor } from 'src/interceptors/responseTransform.interceptor';
import { AdminEntity } from 'src/modules/admin/entities';
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
import { CreateAdminResponseDto } from '../dots/responseDtos/createAdminResponse.dto';
import { JwtAuthGuard } from '../guards/accessToken.guard';
import { LocalAuthGuard } from '../guards/localAuth.guard';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Controller()
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

  @Post('v1/admins')
  @ApiTags('Register')
  @UseInterceptors(ResponseTransformInterceptor, ClassSerializerInterceptor)
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    type: CreateAdminResponseDto,
    description: 'Successfully created',
  })
  @ApiBody({ type: CreateAdminDto })
  async registerAdmin(
    @Body() createAdminDto: CreateAdminDto,
  ): Promise<AdminEntity> {
    return await this._adminService.createAdmin(createAdminDto);
  }

  @Post('v1/players')
  @ApiTags('Register')
  @UseInterceptors(ResponseTransformInterceptor, ClassSerializerInterceptor)
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    type: CreatePlayerDto,
    description: 'Successfully created',
  })
  @ApiBody({ type: CreatePlayerDto })
  async registerPlayer(@Body() createPlayerDto: CreatePlayerDto) {
    return await this._playerService.createPlayer(createPlayerDto);
  }

  @Post('v1/coachs')
  @ApiTags('Register')
  @UseInterceptors(ResponseTransformInterceptor, ClassSerializerInterceptor)
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    type: CreateCoachDto,
    description: 'Successfully created',
  })
  @ApiBody({ type: CreateCoachDto })
  async registerCoach(@Body() createCoachDto: CreateCoachDto) {
    return await this._coachService.createCoach(createCoachDto);
  }

  @Post('v1/spectators')
  @ApiTags('Register')
  @UseInterceptors(ResponseTransformInterceptor, ClassSerializerInterceptor)
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    type: CreateSpectatorDto,
    description: 'Successfully created',
  })
  @ApiBody({ type: CreateSpectatorDto })
  async registerSpectator(@Body() createSpectatorDto: CreateSpectatorDto) {
    return await this._userService.createUser(createSpectatorDto);
  }

  @Post('v1/referees')
  @ApiTags('Register')
  @UseInterceptors(ResponseTransformInterceptor, ClassSerializerInterceptor)
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    type: CreateRefereeDto,
    description: 'Successfully created',
  })
  @ApiBody({ type: CreateRefereeDto })
  async registerReferee(@Body() createRefereDto: CreateRefereeDto) {
    return this._refereeService.createReferee(createRefereDto);
  }

  @Post('v1/auth/login')
  @ApiTags('Auth')
  @UseGuards(LocalAuthGuard)
  async login(@Request() { user }) {
    return await this._authService.login(user);
  }

  @Post('v1/auth/logout')
  @ApiTags('Auth')
  @ApiBearerAuth()
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

  @Post('v1/auth/refresh')
  @ApiTags('Auth')
  async getAccessTokenFromRefreshToken(@Body() token: RefreshTokenDto) {
    return await this._tokenService.refresh(token);
  }
}
