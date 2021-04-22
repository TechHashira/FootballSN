import { Controller, Post } from '@nestjs/common';
import { SeasonService } from '../services/season.service';

@Controller('v1')
export class SeasonController {
  constructor(private _seasonService: SeasonService) {}
}
