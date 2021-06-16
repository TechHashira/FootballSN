import { Injectable } from '@nestjs/common';
import { SeasonRepository } from '@season/repositories/season.repository';

@Injectable()
export class SeasonValidationService {
  constructor(private _seasonRepository: SeasonRepository) {}
  async validIfExistCurrentSeasonByTournament(
    tournamentId: string,
  ): Promise<boolean> {
    const season = await this._seasonRepository.findOne({
      relations: ['tournament'],
      where: { tournament: { tournamentId }, seasonState: true },
    });

    return !season;
  }
}
