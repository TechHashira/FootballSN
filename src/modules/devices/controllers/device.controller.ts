import { JwtAuthGuard } from '@auth/guards/accessToken.guard';
import { SaveFcmTokenDto } from '@devices/dtos/saveFcmToken.dto';
import { DeviceService } from '@devices/services/device.service';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('v1/device')
@ApiTags('Device')
export class DeviceController {
  constructor(private _deviceService: DeviceService) {}

  @Post('save-fcm-tokens')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async saveFcmTokem(
    @Body() saveFcmTokenDto: SaveFcmTokenDto,
    @Req() { user },
    @Res() res: Response,
  ) {
    await this._deviceService.saveFcmToken(saveFcmTokenDto, user);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'FCM saved correctly>',
    });
  }
}
