import { AdminService } from '@admin/services/admin.service';
import { IUserRequest } from '@auth/interfaces/userRequest.interface';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { NewsWallEntity } from '@notice/entities/newsWall.entity';
import { CreateSeasonDto } from '@season/registration/dtos/createSeason.dto';
import { SeasonService } from '@season/registration/services/season.service';
import { TournamentEntity } from '@tournament/entities/tournament.entity';
import { CreateTournamentDto } from '@tournament/registration/dtos/createTournament.dto';
import { TournamentRepository } from '@tournament/repositories/tournament.repository';
import { Connection } from 'typeorm';

@Injectable()
export class TournamentService {
  constructor(
    private readonly _tournamentRepository: TournamentRepository,
    private _adminService: AdminService,
    private _seasonService: SeasonService,
    private connection: Connection,
  ) {}

  async createTournament(
    createTournamentDto: CreateTournamentDto,
    { pre_season_init_date, pre_season_final_date }: CreateSeasonDto,
    { userId }: IUserRequest,
  ): Promise<TournamentEntity> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const admin = await this._adminService.getAdminByUserId(userId);
      if (!admin) {
        throw new UnauthorizedException();
      }

      const tournamentObj = { ...createTournamentDto };

      const tournament = this._tournamentRepository.create({
        ...tournamentObj,
        admin,
      });

      await queryRunner.manager.save<TournamentEntity>(tournament);
      const season = {
        tournamentId: tournament.tournamentId,
        pre_season_init_date,
        pre_season_final_date,
      };

      const newsWall = queryRunner.manager.create<NewsWallEntity>(
        NewsWallEntity,
        { tournament },
      );
      await queryRunner.manager.save<NewsWallEntity>(newsWall);

      await queryRunner.commitTransaction();
      delete tournament.admin;

      await this._seasonService.createSeason(season);

      return tournament;
    } catch (erro) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(erro);
    } finally {
      await queryRunner.release();
    }
  }

  async findTournamentById(tournamentId: string): Promise<TournamentEntity> {
    return await this._tournamentRepository.findOne({
      where: { tournamentId },
    });
  }
}
