import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTournamentDto } from '../dtos/createTournament.dto';
import { TournamentRepository } from '../repositories/tournament.repository';
import { v4 as uuidv4 } from 'uuid';
import { TournamentEntity } from '../entities/tournament.entity';
import { AdminService } from 'src/modules/admin/services/admin.service';
import { IUserRequest } from 'src/modules/auth/interfaces/userRequest.interface';

@Injectable()
export class TournamentService {
  constructor(
    private readonly _tournamentRepository: TournamentRepository,
    private _adminService: AdminService,
  ) {}

  async createTournament(
    createTournamentDto: CreateTournamentDto,
    { userId }: IUserRequest,
  ): Promise<TournamentEntity> {
    const admin = await this._adminService.validateAdmin(userId);

    if (!admin) {
      throw new UnauthorizedException();
    }

    try {
      const invitation_code = await this.generateInvitationCode();

      const tournamentObj = { ...createTournamentDto, invitation_code };

      const tournament = this._tournamentRepository.create({
        ...tournamentObj,
        admin,
      });

      console.log(tournament);
      await this._tournamentRepository.save(tournament);

      return tournament;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  private async generateInvitationCode(): Promise<string> {
    return uuidv4();
  }
}
