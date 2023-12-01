import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { ApiTags } from '@nestjs/swagger';
import { SignupDto } from './dto/signup.dto';
import { Public } from 'src/decorator/public.decorator';

@Controller('auth')
@ApiTags('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('/signin')
  signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto);
  }
}
