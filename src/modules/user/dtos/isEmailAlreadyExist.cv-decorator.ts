import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from '../repositories';

@ValidatorConstraint({ name: 'IsEmailAlreadyExistsContraint', async: true })
@Injectable()
export class IsEmailAlreadyExistsContraint
  implements ValidatorConstraintInterface {
  constructor(private readonly _userRepository: UserRepository) {}

  async validate(email: string) {
    const user = await this._userRepository.findOne({ where: { email } });
    return !user;
  }
}
