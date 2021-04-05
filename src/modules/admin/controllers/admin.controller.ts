import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('tonacatepeque/aft/v1/admin')
@ApiTags('Admin')
export class AdminController {
  @Get('hello')
  async test() {
    return 'Hello world';
  }
}
