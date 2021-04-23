import { AdminEntity } from '@admin/entities/admin.entity';
import { AdminService } from '@admin/services/admin.service';
import { RefreshTokenDto } from '@auth/dots/accessTokenDto.dto';
import { LogOutRequestDto } from '@auth/dots/logOutRequest.dto';
import { CreateAdminResponseDto } from '@auth/dots/responseDtos/createAdminResponse.dto';
import { JwtAuthGuard } from '@auth/guards/accessToken.guard';
import { LocalAuthGuard } from '@auth/guards/localAuth.guard';
import { AuthService } from '@auth/services/auth.service';
import { TokenService } from '@auth/services/token.service';
import { CreateCoachResponseDto } from '@coach/dtos/coachResponse.dto';
import { CoachService } from '@coach/services/coach.service';
import { ResponseTransformInterceptor } from '@interceptors/responseTransform.interceptor';
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
import { CreatePlayerResponseDto } from '@player/dtos/createPlayerResponse.dto';
import { PlayerService } from '@player/services/player.service';
import { CreateRefereeResponseDto } from '@referee/dtos/createRefereeResponse.dto';
import { RefereeService } from '@referee/services/referee.service';
import { CreateSeasonDto } from '@season/dtos/createSeason.dto';
import { CreateSeasonResponseDto } from '@season/dtos/createSeasonResponse.dto';
import { SeasonService } from '@season/services/season.service';
import { CreateTeamDto } from '@team/dtos/createTeam.dto';
import { CreateTeamResponseDto } from '@team/dtos/createTeamResponse.dto';
import { TeamService } from '@team/services/team.service';
import { CreateTournamentDto } from '@tournament/dtos/createTournament.dto';
import { CreateTournamentResponseDto } from '@tournament/dtos/createTournamentResponse.dto';
import { TournamentDto } from '@tournament/dtos/tournament.dto';
import { TournamentService } from '@tournament/services/tournament.service';
import { CreateSpectatorResponseDto } from '@user/dtos/createSpectator.dto';
import { CreateAdminDto } from '@user/dtos/creationalDtos/createAdminDto.dto';
import { CreateCoachDto } from '@user/dtos/creationalDtos/createCoachDto.dto';
import { CreatePlayerDto } from '@user/dtos/creationalDtos/createPlayerDto.dto';
import { CreateRefereeDto } from '@user/dtos/creationalDtos/createRefereeDto.dto';
import { CreateSpectatorDto } from '@user/dtos/creationalDtos/createSpectatorDto.dto';
import { UserService } from '@user/services/user.service';

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
    private _teamService: TeamService,
    private _seasonService: SeasonService,
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
    type: CreatePlayerResponseDto,
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
    type: CreateCoachResponseDto,
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
    type: CreateSpectatorResponseDto,
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
    type: CreateRefereeResponseDto,
    description: 'Successfully created',
  })
  @ApiBody({ type: CreateRefereeDto })
  async registerReferee(@Body() createRefereDto: CreateRefereeDto) {
    return await this._refereeService.createReferee(createRefereDto);
  }

  @Post('tournaments')
  @ApiTags('Register')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateTournamentResponseDto,
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

  @Post('teams')
  @ApiTags('Register')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateTeamResponseDto,
  })
  @ApiBody({ type: CreateTeamDto })
  async regiterTeam(@Body() createTeamDto: CreateTeamDto, @Request() { user }) {
    return await this._teamService.createTeam(createTeamDto, user);
  }

  @Post('seasons')
  @ApiTags('Register')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateSeasonResponseDto,
  })
  @ApiBody({ type: CreateSeasonDto })
  async registerSeason(
    @Body() createSeasonDto: CreateSeasonDto,
    @Request() { user },
  ) {
    return await this._seasonService.createSeason(createSeasonDto, user);
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
