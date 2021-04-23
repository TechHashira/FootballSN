import { CreatedFailedException } from '@exceptions/createdFailed.exception';
import { Injectable } from '@nestjs/common';
import { SecurityService } from '@security/services/security.service';
import { CreateSpectatorDto } from '@user/dtos/creationalDtos/createSpectatorDto.dto';
import { UserEntity } from '@user/entities/user.entity';
import { UserRepository } from '@user/repositories/user.repository';

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
