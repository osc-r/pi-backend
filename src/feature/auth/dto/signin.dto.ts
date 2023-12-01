import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/feature/user/dto/create-user.dto';

export class SigninDto extends PickType(CreateUserDto, ['email', 'password']) {}
