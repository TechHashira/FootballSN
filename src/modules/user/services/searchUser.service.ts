import { CoachEntity } from '@coach/entities/coach.entity';
import { CreatedFailedException } from '@exceptions/createdFailed.exception';
import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';

@Injectable()
export class SearchUserService {
  async getUserIdByTeamId(teamId: string): Promise<string> {
    try {
      const { userId } = await getConnection()
        .createQueryBuilder(CoachEntity, 'coach')
        .innerJoinAndSelect('coach.teams', 'teams')
        .where('teams.teamId= :teamId', { teamId })
        .getOne();
      return userId;
    } catch (error) {
      throw new CreatedFailedException(error);
    }
  }
}
