import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { isAfter, isBefore } from 'date-fns';
import { CreatedFailedException } from 'src/exceptions/createdFailed.exception';
import { IUserRequest } from 'src/modules/auth/interfaces/userRequest.interface';
import { CoachService } from 'src/modules/coach/services/coach.service';
import { SeasonRepository } from 'src/modules/season/repositories/season.repository';
import { TournamentEntity } from 'src/modules/tournament/entities/tournament.entity';
import { TournamentService } from 'src/modules/tournament/services/tournament.service';
import { getConnection } from 'typeorm';
import { CreateTeamDto } from '../dtos/createTeam.dto';
import { TeamEntity } from '../entities';
import { TeamRepository } from '../repositories/team.repository';

@Injectable()
export class TeamService {
  constructor(
    private readonly _teamRepository: TeamRepository,
    private _coachService: CoachService,
    private _tournamentService: TournamentService,
    private _seasonRepository: SeasonRepository,
  ) {}

  async createTeam(
    { invitation_code, team_name, tournamentId }: CreateTeamDto,
    { userId }: IUserRequest,
  ): Promise<TeamEntity> {
    try {
      const coach = await this._coachService.findCoachByUserId(userId);

      const tournament = await this.checkInvitationCode(
        invitation_code,
        tournamentId,
      );
      const team = this._teamRepository.create({
        team_name,
        coach,
        tournament,
      });

      const {
        teamId: teamIdSaved,
        createdAt,
      } = await this._teamRepository.save(team);

      if (!(await this.validateRegistrationDate(tournamentId, createdAt))) {
        await getConnection()
          .createQueryBuilder()
          .delete()
          .from(TeamEntity)
          .where('teamId = :teamIdSaved', { teamIdSaved })
          .execute();

        throw new CreatedFailedException('Invalid date for registration');
      }

      return team;
    } catch (error) {
      throw new CreatedFailedException(error);
    }
  }

  private async validateRegistrationDate(
    tournamentId: string,
    teamCreationDate: Date,
  ): Promise<boolean> {
    const season = await this._seasonRepository.findOne({
      relations: ['tournament'],
      where: { tournament: { tournamentId }, seasonState: true },
    });

    if (
      isAfter(teamCreationDate, season.pre_season_final_date) ||
      isBefore(teamCreationDate, season.pre_season_init_date)
    ) {
      return false;
    }

    return true;
  }

  private async checkInvitationCode(
    invitation_code: string,
    tournamentId: string,
  ): Promise<TournamentEntity> {
    const tournament = await this._tournamentService.findTournamentById(
      tournamentId,
    );

    if (!tournament) throw new NotFoundException();

    if (invitation_code !== tournament.invitation_code) {
      throw new UnauthorizedException('invalid code or does not exist');
    }

    return tournament;
  }
}
