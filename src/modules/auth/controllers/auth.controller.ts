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
import { CreateTournamentDto } from 'src/modules/tournament/dtos/createTournament.dto';
import { TournamentDto } from 'src/modules/tournament/dtos/tournament.dto';
import { TournamentService } from 'src/modules/tournament/services/tournament.service';
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

@Controller('v1')
export class AuthController {
  constructor(
    private _adminService: AdminService,
    private _playerService: PlayerService,
    private _coachService: CoachService,
    private _userService: UserService,
    private _refereeService: RefereeService,
    private _authService: AuthService,
    private _tokenService: TokenService,
    private _tournamentService: TournamentService,
  ) {}

  @Post('admins')
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

  @Post('players')
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

  @Post('coachs')
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

  @Post('spectators')
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

  @Post('referees')
  @ApiTags('Register')
  @UseInterceptors(ResponseTransformInterceptor, ClassSerializerInterceptor)
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    type: CreateRefereeDto,
    description: 'Successfully created',
  })
  @ApiBody({ type: CreateRefereeDto })
  async registerReferee(@Body() createRefereDto: CreateRefereeDto) {
    return await this._refereeService.createReferee(createRefereDto);
  }

  @Post('tournaments')
  @ApiTags('Register')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: TournamentDto,
  })
  @ApiBody({ type: TournamentDto })
  async registerTournament(
    @Body() createTournamentDto: CreateTournamentDto,
    @Request() { user },
  ) {
    return await this._tournamentService.createTournament(
      createTournamentDto,
      user,
    );
  }

  @Post('auth/login')
  @ApiTags('Auth')
  @UseGuards(LocalAuthGuard)
  async login(@Request() { user }) {
    return await this._authService.login(user);
  }

  @Post('auth/logout')
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

  @Post('auth/refresh')
  @ApiTags('Auth')
  async getAccessTokenFromRefreshToken(@Body() token: RefreshTokenDto) {
    return await this._tokenService.refresh(token);
  }
}
