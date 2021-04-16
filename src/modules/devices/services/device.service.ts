import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PG_UNIQUE_CONSTRAINT_VIOLATION } from 'src/common/constants/errorDatabase.constants';
import { CreatedFailedException } from 'src/exceptions/createdFailed.exception';
import { DeviceRepository } from '../repositories/device.repository';
import { SaveFcmTokenDto } from '../dtos/saveFcmToken.dto';

@Injectable()
export class DeviceService {
  constructor(private readonly _deviceRepository: DeviceRepository) {}

  async saveFcmToken({ fcm_token }: SaveFcmTokenDto, { userId }: any) {
    try {
      const device = this._deviceRepository.create({ fcm_token, userId });
      await this._deviceRepository.save(device);
      return device;
    } catch ({ code }) {
      if (code && code === PG_UNIQUE_CONSTRAINT_VIOLATION) {
        throw new CreatedFailedException('fcm token already exist');
      } else {
        throw new HttpException(
          'Sorry, come back later :P',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
