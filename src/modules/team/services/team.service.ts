import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatedFailedException } from 'src/exceptions/createdFailed.exception';
import { IUserRequest } from 'src/modules/auth/interfaces/userRequest.interface';
import { CoachService } from 'src/modules/coach/services/coach.service';
import { TournamentEntity } from 'src/modules/tournament/entities/tournament.entity';
import { TournamentService } from 'src/modules/tournament/services/tournament.service';
import { CreateTeamDto } from '../dtos/createTeam.dto';
import { TeamEntity } from '../entities';
import { TeamRepository } from '../repositories/team.repository';

@Injectable()
export class TeamService {
  constructor(
    private readonly _teamRepository: TeamRepository,
    private _coachService: CoachService,
    private _tournamentService: TournamentService,
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

      console.log(tournament);
      await this._teamRepository.save(team);

      return team;
    } catch (error) {
      throw new CreatedFailedException(error);
    }
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
