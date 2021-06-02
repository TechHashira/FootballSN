import { Injectable } from '@nestjs/common';
import { TournamentRepository } from '@tournament/repositories/tournament.repository';

@Injectable()
export class ValidationTournamentService {
  constructor(private readonly _tournamentRepository: TournamentRepository) {}

  async checkIfTournamentIsPublic(tournamentId: string): Promise<boolean> {
    const { tournament_state } = await this._tournamentRepository.findOne({
      tournamentId,
    });

    return tournament_state === 'PUBLIC' ? true : false;
  }
}
