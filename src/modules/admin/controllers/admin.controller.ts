import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('v1')
@ApiTags('Admin')
export class AdminController {}
