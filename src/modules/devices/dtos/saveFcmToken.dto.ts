import { IsNotEmpty, IsString } from 'class-validator';

export class SaveFcmTokenDto {
  @IsNotEmpty()
  @IsString()
  fcm_token: string;
}
