import { IUserRequest } from '@auth/interfaces/userRequest.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendNotificationService {
  async sendTeamRequestToTournament({ userId }: IUserRequest) {}
}
