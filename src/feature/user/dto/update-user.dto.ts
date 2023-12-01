import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
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
