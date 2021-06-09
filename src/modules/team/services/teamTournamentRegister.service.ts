import { CreatedFailedException } from '@exceptions/createdFailed.exception';
import { Injectable } from '@nestjs/common';
import { TeamEntity } from '@team/entities/team.entity';
import { TeamRepository } from '@team/repositories/team.repository';
import { getConnection } from 'typeorm';

@Injectable()
export class TeamTournamentRegisterService {
  constructor(private readonly _teamRepository: TeamRepository) {}

  async registerTeamOnTournament(
    subjectId: string,
    subjectObjectiveId: string,
  ) {
    try {
      const { teamId } = await this._teamRepository.findOne({
        where: { teamId: subjectId },
      });

      if (!teamId) throw new CreatedFailedException(`Team doesn't exist`);

      const result = await getConnection()
        .createQueryBuilder()
        .update(TeamEntity)
        .set({ tournamentId: subjectObjectiveId })
        .where('teamId = :teamId', { teamId })
        .execute();

      return result;
    } catch (error) {
      throw new CreatedFailedException(error);
    }
  }
}
