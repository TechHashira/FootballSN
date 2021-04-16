import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginRequestDto {
  @IsNotEmpty({ message: 'A Email is required' })
  @IsEmail()
  readonly email: string;

  @IsNotEmpty({ message: 'A password is required to login' })
  readonly password: string;
}
