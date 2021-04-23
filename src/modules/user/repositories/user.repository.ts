import { UserEntity } from '@user/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
