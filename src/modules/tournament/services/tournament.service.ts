import { Injectable } from '@nestjs/common';
import { CreateTournamentDto } from '../dtos/createTournament.dto';
import { TournamentRepository } from '../repositories/tournament.repository';
import { v4 as uuidv4 } from 'uuid';
import { TournamentEntity } from '../entities/tournament.entity';

@Injectable()
export class TournamentService {
  constructor(private readonly _tournamentRepository: TournamentRepository) {}

  async createTournament(
    createTournamentDto: CreateTournamentDto,
  ): Promise<TournamentEntity> {
    const invitation_code = await this.generateInvitationCode();

    const tournamentObj = { invitation_code, ...createTournamentDto };

    const tournament = this._tournamentRepository.create(tournamentObj);

    await this._tournamentRepository.save(tournament);

    return tournament;
  }

  private async generateInvitationCode(): Promise<string> {
    return uuidv4();
  }
}
