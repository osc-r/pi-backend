import { PickType } from '@nestjs/mapped-types';
import { SignupDto } from './signup.dto';

export class SigninDto extends PickType(SignupDto, ['email', 'password']) {}
