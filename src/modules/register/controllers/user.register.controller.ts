import { JwtAuthGuard } from '@auth/guards/accessToken.guard';
import { ResponseTransformInterceptor } from '@interceptors/responseTransform.interceptor';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
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
import { CreateSeasonDto } from '@season/registration/dtos/createSeason.dto';
import { CreateSeasonResponseDto } from '@season/registration/dtos/createSeasonResponse.dto';
import { SeasonService } from '@season/registration/services/season.service';
import { CreateTeamDto } from '@team/registration/dtos/createTeam.dto';
import { CreateTeamResponseDto } from '@team/registration/dtos/createTeamResponse.dto';
import { TeamRegisterService } from '@team/registration/services/team.service';
import { CreateTournamentDto } from '@tournament/registration/dtos/createTournament.dto';
import { CreateTournamentResponseDto } from '@tournament/registration/dtos/createTournamentResponse.dto';
import { TournamentService } from '@tournament/registration/services/tournament.service';
import { UserEntity } from '@user/entities/user.entity';
import { CreateUserDto } from '@user/registration/dtos/createUser.dto';
import { CreateUserResponseDto } from '@user/registration/dtos/createUserResponse.dto';
import { UserRegisterService } from '@user/registration/services/user.register.service';

@Controller('v1/register')
export class RegisterController {
  constructor(
    private _userService: UserRegisterService,
    private _tournamentService: TournamentService,
    private _seasonService: SeasonService,
    private _teamRegisterService: TeamRegisterService,
  ) {}

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

  @Post('tournaments')
  @ApiTags('Register')
  @UseInterceptors(ResponseTransformInterceptor, ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateTournamentResponseDto,
  })
  @ApiBody({ type: CreateTournamentDto })
  async registerTournament(
    @Body() createTournamentDto: CreateTournamentDto,
    @Body() createSeasonDto: CreateSeasonDto,
    @Request() { user },
  ) {
    return await this._tournamentService.createTournament(
      createTournamentDto,
      createSeasonDto,
      user,
    );
  }

  @Post('seasons')
  @ApiTags('Register')
  @UseInterceptors(ResponseTransformInterceptor, ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateSeasonResponseDto,
  })
  @ApiBody({ type: CreateSeasonDto })
  async registerSeason(@Body() createSeasonDto: CreateSeasonDto) {
    return await this._seasonService.createSeason(createSeasonDto);
  }

  @Post('teams')
  @ApiTags('Register')
  @UseInterceptors(ResponseTransformInterceptor, ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateTeamResponseDto,
  })
  @ApiBody({ type: CreateTeamDto })
  async registerTeam(@Body() createTeamDto: CreateTeamDto, @Req() { user }) {
    return await this._teamRegisterService.createTeam(createTeamDto, user);
  }
}
