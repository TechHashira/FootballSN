import { Role } from '@common/constants';

export interface IUserRequest {
  userId: string;
  roles: Role;
  profilePath: string;
  name: string;
  lastname: string;
  available: boolean;
}
