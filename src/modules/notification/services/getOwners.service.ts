import { AdminEntity } from '@admin/entities/admin.entity';
import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';

@Injectable()
export class GetOwnersService {
  async getUserIdByTournamentId(tournamentId: string): Promise<string> {
    const { userId } = await getConnection()
      .createQueryBuilder(AdminEntity, 'admin')
      .innerJoinAndSelect('admin.tournaments', 'tournaments')
      .where('tournaments.tournamentId = :tournamentId', { tournamentId })
      .getOne();

    return userId;
  }
}
