import { Role } from 'src/common/constants';

export interface IUserRequest {
  userId: string;
  roles: Role;
  profilePath: string;
  name: string;
  lastname: string;
  available: boolean;
}
