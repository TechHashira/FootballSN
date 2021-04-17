import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/modules/auth/guards/accessToken.guard';
import { SaveFcmTokenDto } from '../dtos/saveFcmToken.dto';
import { DeviceService } from '../services/device.service';

@Controller()
export class DeviceController {
  constructor(private _deviceService: DeviceService) {}

  @Post('save_fcm_tokens')
  @UseGuards(JwtAuthGuard)
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
