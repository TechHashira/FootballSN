import { Injectable } from '@nestjs/common';
import { CreatedFailedException } from 'src/exceptions/createdFailed.exception';
import { CreateSpectatorDto } from '../dtos/creationalDtos/createSpectatorDto.dto';
import { UserEntity } from '../entities';
import { UserRepository } from '../repositories';

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  async createUser(createSpectator: CreateSpectatorDto) {
    try {
      const user = this._userRepository.create(createSpectator);
      await this._userRepository.save<UserEntity>(user);
      return user;
    } catch ({ message }) {
      throw new CreatedFailedException(message);
    }
  }
}
