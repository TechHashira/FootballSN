import { UserAuthForgottenPasswordEntity } from '@user/entities/userAuthForgottenPassword.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserAuthForgottenPasswordEntity)
export class UserAuthForgottenPasswordRepository extends Repository<UserAuthForgottenPasswordEntity> {}
