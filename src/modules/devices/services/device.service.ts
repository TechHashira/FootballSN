import { IUserRequest } from '@auth/interfaces/userRequest.interface';
import { PG_UNIQUE_CONSTRAINT_VIOLATION } from '@common/constants/errorDatabase.constants';
import { SaveFcmTokenDto } from '@devices/dtos/saveFcmToken.dto';
import { DeviceRepository } from '@devices/repositories/device.repository';
import { CreatedFailedException } from '@exceptions/createdFailed.exception';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class DeviceService {
  constructor(private readonly _deviceRepository: DeviceRepository) {}

  async saveFcmToken(
    { fcm_token }: SaveFcmTokenDto,
    { userId }: IUserRequest,
  ): Promise<void> {
    try {
      const fcm_state = await this.checkFcmState(fcm_token);

      if (!fcm_state) {
        const device = this._deviceRepository.create({ fcm_token, userId });
        await this._deviceRepository.save(device);
      }

      await this.updateStateFcmTokem(fcm_token, true);
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

  async updateStateFcmTokem(
    fcm_token: string,
    desiredState?: boolean,
  ): Promise<void> {
    const active = !desiredState ? false : true;
    await this._deviceRepository.update({ fcm_token }, { active });
  }

  async checkFcmState(fcm_token: string): Promise<boolean> {
    const device = await this._deviceRepository.findOne({ fcm_token });

    return device && !device.active;
  }
}
