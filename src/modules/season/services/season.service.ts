import { CreatedFailedException } from '@exceptions/createdFailed.exception';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSeasonDto } from '@season/dtos/createSeason.dto';
import { SeasonEntity } from '@season/entities/season.entity';
import { SeasonRepository } from '@season/repositories/season.repository';
import { TournamentRepository } from '@tournament/repositories/tournament.repository';

@Injectable()
export class SeasonService {
  constructor(
    private readonly _seasonRepository: SeasonRepository,
    private readonly _tournamentRepository: TournamentRepository,
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

      const seasonStatePerTournament = await this.validIfExistCurrentSeasonByTournament(
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

  private async validIfExistCurrentSeasonByTournament(
    tournamentId: string,
  ): Promise<boolean> {
    const season = await this._seasonRepository.findOne({
      relations: ['tournament'],
      where: { tournament: { tournamentId }, seasonState: true },
    });

    return !season;
  }
}
