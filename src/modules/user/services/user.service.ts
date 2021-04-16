import { Injectable } from '@nestjs/common';
import { CreatedFailedException } from 'src/exceptions/createdFailed.exception';
import { SecurityService } from 'src/modules/security/services/security.service';
import { CreateSpectatorDto } from '../dtos/creationalDtos/createSpectatorDto.dto';
import { UserEntity } from '../entities';
import { UserRepository } from '../repositories';

@Injectable()
export class UserService {
  constructor(
    private readonly _userRepository: UserRepository,
    private _securityService: SecurityService,
  ) {}

  async createUser(createSpectatorDto: CreateSpectatorDto) {
    try {
      const dtoHashed = await this._securityService.hashPassword(
        createSpectatorDto,
      );
      const user = this._userRepository.create(dtoHashed);
      await this._userRepository.save<UserEntity>(user);
      return user;
    } catch ({ message }) {
      throw new CreatedFailedException(message);
    }
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return await this._userRepository.findOne({ email });
  }
}
