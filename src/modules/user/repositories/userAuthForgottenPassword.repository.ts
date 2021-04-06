import { EntityRepository, Repository } from 'typeorm';
import { UserAuthForgottenPasswordEntity } from '../entities';

@EntityRepository(UserAuthForgottenPasswordEntity)
export class UserAuthForgottenPasswordRepository extends Repository<UserAuthForgottenPasswordEntity> {}
