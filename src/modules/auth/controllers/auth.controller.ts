import { RefreshTokenDto } from '@auth/dots/accessTokenDto.dto';
import { LogOutRequestDto } from '@auth/dots/logOutRequest.dto';
import { JwtAuthGuard } from '@auth/guards/accessToken.guard';
import { LocalAuthGuard } from '@auth/guards/localAuth.guard';
import { AuthService } from '@auth/services/auth.service';
import { TokenService } from '@auth/services/token.service';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('v1')
export class AuthController {
  constructor(
    private _authService: AuthService,
    private _tokenService: TokenService,
  ) {}
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
