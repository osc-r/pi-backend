import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { User, UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  firstname?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  lastname?: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth?: Date;

  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean;

  static toEntity(data: CreateUserDto) {
    const user = new User();
    user.email = data.email;
    user.password = data.password;
    user.firstname = data.firstname;
    user.lastname = data.lastname;
    user.dateOfBirth = data.dateOfBirth;
    if (data.isAdmin) {
      user.role = UserRole.ADMIN;
    } else {
      user.role = UserRole.USER;
    }
    return user;
  }
}
