import { IsJWT, IsNotEmpty } from 'class-validator';

export class LogOutRequestDto {
  @IsNotEmpty()
  fcm_token: string;

  @IsNotEmpty()
  @IsJWT()
  refresh_token: string;
}
