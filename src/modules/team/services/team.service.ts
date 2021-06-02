import { IUserRequest } from '@auth/interfaces/userRequest.interface';
import { CoachService } from '@coach/services/coach.service';
import { CreatedFailedException } from '@exceptions/createdFailed.exception';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SeasonRepository } from '@season/repositories/season.repository';
import { CreateTeamDto } from '@team/dtos/createTeam.dto';
import { TeamEntity } from '@team/entities/team.entity';
import { TeamRepository } from '@team/repositories/team.repository';
import { TournamentEntity } from '@tournament/entities/tournament.entity';
import { TournamentService } from '@tournament/services/tournament.service';
import { isAfter, isBefore } from 'date-fns';

@Injectable()
export class TeamService {
  constructor(
    private readonly _teamRepository: TeamRepository,
    private _coachService: CoachService,
    private _tournamentService: TournamentService,
    private _seasonRepository: SeasonRepository,
  ) {}

  async createTeam(
    { team_name }: CreateTeamDto,
    { userId }: IUserRequest,
  ): Promise<TeamEntity> {
    try {
      const coach = await this._coachService.findCoachByUserId(userId);

      const team = this._teamRepository.create({
        team_name,
        coach,
      });

      await this._teamRepository.save(team);

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
}
