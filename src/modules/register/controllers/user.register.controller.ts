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
import { CreateSeasonDto } from '@season/dtos/createSeason.dto';
import { CreateSeasonResponseDto } from '@season/dtos/createSeasonResponse.dto';
import { SeasonService } from '@season/services/season.service';
import { CreateTeamDto } from '@team/dtos/createTeam.dto';
import { CreateTeamResponseDto } from '@team/dtos/createTeamResponse.dto';
import { TeamRegisterService } from '@team/services/team.service';
import { CreateTournamentDto } from '@tournament/dtos/createTournament.dto';
import { CreateTournamentResponseDto } from '@tournament/dtos/createTournamentResponse.dto';
import { TournamentService } from '@tournament/services/tournament.service';
import { CreateUserDto } from '@user/dtos/createUser.dto';
import { CreateUserResponseDto } from '@user/dtos/createUserResponse.dto';
import { UserEntity } from '@user/entities/user.entity';
import { UserRegisterService } from '@user/services/user.register.service';

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
