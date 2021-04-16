import { HttpException, HttpStatus } from '@nestjs/common';

export class TokenMalformedException extends HttpException {
  constructor() {
    super('Unauthorized.token_invalid', HttpStatus.UNAUTHORIZED);
  }
}
