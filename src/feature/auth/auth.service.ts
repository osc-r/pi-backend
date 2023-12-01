import { Injectable } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signin(dto: SigninDto) {
    const user = await this.userService.findOneByEmail(dto.email);
    if (user.password === dto.password) {
      return true;
    }
    return false;
  }

  async signup(dto: SignupDto) {
    const user = await this.userService.create(dto);
    return user;
  }
}
