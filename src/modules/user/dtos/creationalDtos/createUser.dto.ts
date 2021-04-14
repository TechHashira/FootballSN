import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import { IsEmailAlreadyExistsContraint } from '..';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  @Validate(IsEmailAlreadyExistsContraint, { message: 'Email already exits' })
  email: string;

  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
