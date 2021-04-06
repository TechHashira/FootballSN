import { Injectable } from '@nestjs/common';
import { CreatedFailedException } from 'src/exceptions/createdFailed.exception';
import { CreateUserDto } from '../dtos';
import { UserRepository } from '../repositories';

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const user = this._userRepository.create(createUserDto);
      await this._userRepository.save(user);
      return user;
    } catch ({ message }) {
      throw new CreatedFailedException(message);
    }
  }
}
