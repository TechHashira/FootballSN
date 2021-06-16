import { CreatedFailedException } from '@exceptions/createdFailed.exception';
import { Injectable, NotFoundException } from '@nestjs/common';
import { SeasonEntity } from '@season/entities/season.entity';
import { CreateSeasonDto } from '@season/registration/dtos/createSeason.dto';
import { SeasonRepository } from '@season/repositories/season.repository';
import { TournamentRepository } from '@tournament/repositories/tournament.repository';
import { SeasonValidationService } from './season.validation.service';

@Injectable()
export class SeasonService {
  constructor(
    private readonly _seasonRepository: SeasonRepository,
    private readonly _tournamentRepository: TournamentRepository,
    private _seasonValidationService: SeasonValidationService,
  ) {}

  async createSeason({
    tournamentId,
    pre_season_init_date,
    pre_season_final_date,
  }: CreateSeasonDto): Promise<SeasonEntity> {
    try {
      const tournament = await this._tournamentRepository.findOne({
        where: { tournamentId },
      });
      if (!tournament) throw new NotFoundException();

      const seasonStatePerTournament = await this._seasonValidationService.validIfExistCurrentSeasonByTournament(
        tournamentId,
      );

      if (!seasonStatePerTournament) {
        throw new CreatedFailedException(
          'Already exist an available season in this tournament',
        );
      }

      const season = this._seasonRepository.create({
        pre_season_final_date,
        pre_season_init_date,
        tournament,
      });

      await this._seasonRepository.save(season);

      return season;
    } catch (error) {
      throw new CreatedFailedException(error);
    }
  }
}
