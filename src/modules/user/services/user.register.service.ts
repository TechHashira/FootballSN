import { AdminService } from '@admin/services/admin.service';
import { CoachService } from '@coach/services/coach.service';
import { CreatedFailedException } from '@exceptions/createdFailed.exception';
import { Injectable } from '@nestjs/common';
import { PlayerService } from '@player/services/player.service';
import { RefereeService } from '@referee/services/referee.service';
import { SecurityService } from '@security/services/security.service';
import { CreateUserDto } from '@user/dtos/createUser.dto';
import { UserEntity } from '@user/entities/user.entity';
import { UserRepository } from '@user/repositories/user.repository';

@Injectable()
export class UserRegisterService {
  constructor(
    private readonly _userRepository: UserRepository,
    private _securityService: SecurityService,
    private _adminService: AdminService,
    private _refereeService: RefereeService,
    private _playerService: PlayerService,
    private _coachService: CoachService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const dtoHashed = await this._securityService.hashPassword(createUserDto);
      const user = this._userRepository.create(dtoHashed);
      await this._userRepository.save<UserEntity>(user);
      await this._adminService.createAdmin(user);
      await this._refereeService.createReferee(user);
      await this._playerService.createPlayer(user);
      await this._coachService.createCoach(user);

      return user;
    } catch ({ message }) {
      throw new CreatedFailedException(message);
    }
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return await this._userRepository.findOne({ email });
  }
}
