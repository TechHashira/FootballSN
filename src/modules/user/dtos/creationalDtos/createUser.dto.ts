import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import { IsEmailAlreadyExistsContraint } from '../isEmailAlreadyExist.cv-decorator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @Validate(IsEmailAlreadyExistsContraint, { message: 'Email already exits' })
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
