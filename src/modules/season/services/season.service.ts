import { Injectable, NotFoundException } from '@nestjs/common';
import { TournamentRepository } from 'src/modules/tournament/repositories/tournament.repository';
import { CreateSeasonDto } from '../dtos/createSeason.dto';
import { SeasonEntity } from '../entities/season.entity';
import { SeasonRepository } from '../repositories/season.repository';

@Injectable()
export class SeasonService {
  constructor(
    private readonly _seasonRepository: SeasonRepository,
    private readonly _tournamentRepository: TournamentRepository,
  ) {}

  async createSeason(createSeasonDto: CreateSeasonDto): Promise<SeasonEntity> {
    const { tournamentId } = createSeasonDto;
    const tournament = await this._tournamentRepository.findOne(tournamentId);
    if (!tournament) throw new NotFoundException('Tournament not found');
    const season = this._seasonRepository.create({
      tournament,
      ...createSeasonDto,
    });
    await this._seasonRepository.save(season);
    return season;
  }
}
