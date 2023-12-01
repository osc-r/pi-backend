import { IsDateString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsOptional()
  firstname?: string;

  @IsNotEmpty()
  @IsOptional()
  lastname?: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth?: Date;
}
