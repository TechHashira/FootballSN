import { JwtAuthGuard } from '@auth/guards/accessToken.guard';
import { ResponseTransformInterceptor } from '@interceptors/responseTransform.interceptor';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateSeasonDto } from '@season/dtos/createSeason.dto';
import { CreateSeasonResponseDto } from '@season/dtos/createSeasonResponse.dto';
import { SeasonService } from '@season/services/season.service';
import { CreateTournamentDto } from '@tournament/dtos/createTournament.dto';
import { CreateTournamentResponseDto } from '@tournament/dtos/createTournamentResponse.dto';
import { TournamentDto } from '@tournament/dtos/tournament.dto';
import { TournamentService } from '@tournament/services/tournament.service';
import { CreateUserDto } from '@user/dtos/createUser.dto';
import { CreateUserResponseDto } from '@user/dtos/createUserResponse.dto';
import { UserEntity } from '@user/entities/user.entity';
import { UserService } from '@user/services/user.service';

@Controller('register')
export class UsersRegisterController {
  constructor(
    private _userService: UserService,
    private _tournamentService: TournamentService,
    private _seasonService: SeasonService,
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
  async registerSeason(@Body() createSeasonDto: CreateSeasonDto) {
    return await this._seasonService.createSeason(createSeasonDto);
  }
}
