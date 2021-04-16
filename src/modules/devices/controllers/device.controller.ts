import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/accessToken.guard';
import { SaveFcmTokenDto } from '../dtos/saveFcmToken.dto';
import { DeviceService } from '../services/device.service';

@Controller()
export class DeviceController {
  constructor(private _deviceService: DeviceService) {}

  @Post('fcm_tokens')
  @UseGuards(JwtAuthGuard)
  async saveFcmTokem(
    @Body() saveFcmTokenDto: SaveFcmTokenDto,
    @Req() { user },
  ) {
    return this._deviceService.saveFcmToken(saveFcmTokenDto, user);
  }
}
