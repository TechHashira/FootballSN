import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatedFailedException } from 'src/exceptions/createdFailed.exception';
import { AdminService } from 'src/modules/admin/services/admin.service';
import { IUserRequest } from 'src/modules/auth/interfaces/userRequest.interface';
import { TournamentRepository } from 'src/modules/tournament/repositories/tournament.repository';
import { CreateSeasonDto } from '../dtos/createSeason.dto';
import { SeasonEntity } from '../entities/season.entity';
import { SeasonRepository } from '../repositories/season.repository';

@Injectable()
export class SeasonService {
  constructor(
    private readonly _seasonRepository: SeasonRepository,
    private readonly _tournamentRepository: TournamentRepository,
    private _adminService: AdminService,
  ) {}

  async createSeason(
    {
      tournamentId,
      pre_season_init_date,
      pre_season_final_date,
    }: CreateSeasonDto,
    { userId }: IUserRequest,
  ): Promise<SeasonEntity> {
    try {
      const admin = await this._adminService.getAdminByUserId(userId);
      if (!admin) throw new UnauthorizedException();

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
