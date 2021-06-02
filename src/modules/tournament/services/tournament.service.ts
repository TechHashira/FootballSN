import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Connection } from 'typeorm';
import { AdminService } from '@admin/services/admin.service';
import { IUserRequest } from '@auth/interfaces/userRequest.interface';
import { NewsWallEntity } from '@notice/entities/newsWall.entity';
import { CreateTournamentDto } from '@tournament/dtos/createTournament.dto';
import { TournamentEntity } from '@tournament/entities/tournament.entity';
import { TournamentRepository } from '@tournament/repositories/tournament.repository';
import { SeasonService } from '@season/services/season.service';
import { CreateSeasonDto } from '@season/dtos/createSeason.dto';

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
      const invitation_code = await this.generateInvitationCode();

      const tournamentObj = { ...createTournamentDto, invitation_code };

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

  private async generateInvitationCode(): Promise<string> {
    return uuidv4();
  }

  async findTournamentById(tournamentId: string): Promise<TournamentEntity> {
    return await this._tournamentRepository.findOne({
      where: { tournamentId },
    });
  }
}
