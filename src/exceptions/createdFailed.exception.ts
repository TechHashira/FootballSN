import { BadRequestException } from '@nestjs/common';

export class CreatedFailedException extends BadRequestException {
  constructor(error?: string) {
    super('error.created_failed', error);
  }
}
