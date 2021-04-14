import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import { Role } from 'src/common/constants';
import { IsEmailAlreadyExistsContraint } from './isEmailAlreadyExist.cv-decorator';

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

  @IsNotEmpty()
  @IsEnum(Role, { message: 'Unexpected role' })
  roles: Role;
}
