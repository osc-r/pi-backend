import { Injectable } from '@nestjs/common';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private async getAccessToken(uid: string) {
    return await this.jwtService.signAsync({ sub: uid });
  }

  private async getRefreshToken(uid: string) {
    return await this.jwtService.signAsync(
      { sub: uid },
      { secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET') },
    );
  }

  async signin(dto: SigninDto) {
    const user = await this.userService.findOneByEmail(dto.email);
    if (user.password === dto.password) {
      return {
        access_token: await this.getAccessToken(user.id),
        refresh_token: await this.getRefreshToken(user.id),
      };
    }
    return false;
  }

  async signup(dto: SignupDto) {
    const user = await this.userService.create(dto);
    return {
      access_token: await this.getAccessToken(user.id),
      refresh_token: await this.getRefreshToken(user.id),
    };
  }
}
