import { IUserRequest } from '@auth/interfaces/userRequest.interface';
import { CoachRepository } from '@coach/repositories/coach.repository';
import { CreatedFailedException } from '@exceptions/createdFailed.exception';
import { Injectable } from '@nestjs/common';
import { SeasonRepository } from '@season/repositories/season.repository';
import { TeamEntity } from '@team/entities/team.entity';
import { CreateTeamDto } from '@team/registration/dtos/createTeam.dto';
import { TeamRepository } from '@team/repositories/team.repository';
import { isAfter, isBefore } from 'date-fns';

@Injectable()
export class TeamRegisterService {
  constructor(
    private readonly _teamRepository: TeamRepository,
    private _coachRepository: CoachRepository,
    private _seasonRepository: SeasonRepository,
  ) {}

  async createTeam(
    { team_name }: CreateTeamDto,
    { userId }: IUserRequest,
  ): Promise<TeamEntity> {
    try {
      const coach = await this._coachRepository.findOne({ where: { userId } });
      if (!coach) throw new CreatedFailedException();

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
