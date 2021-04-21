import { Controller, Post } from '@nestjs/common';
import { CreateSeasonDto } from '../dtos/createSeason.dto';
import { SeasonService } from '../services/season.service';

@Controller('v1')
export class SeasonController {
  constructor(private _seasonService: SeasonService) {}

  @Post()
  async registerSeason(createSeasonDto: CreateSeasonDto) {
    return await this._seasonService.createSeason(createSeasonDto);
  }
}
