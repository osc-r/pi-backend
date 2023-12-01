import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserRepository } from '../user/repository/user.repository';
import { SignupDto } from './dto/signup.dto';
import { DatabaseTestModule } from '../../util/database-test-module';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseTestModule,
        TypeOrmModule.forFeature([User]),
        UserModule,
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtService,
        ConfigService,
        UserService,
        UserRepository,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should signin', async () => {
    const dto = new SigninDto();
    dto.email = 'test@gmail.com';
    dto.password = 'password';

    jest.spyOn(service, 'signin').mockResolvedValue({
      access_token: 'some.access.token',
      refresh_token: 'some.refresh.token',
    });

    const response = await controller.signin(dto);

    expect(response).toEqual({
      access_token: 'some.access.token',
      refresh_token: 'some.refresh.token',
    });
    expect(service.signin).toHaveBeenCalled();
  });

  it('should signup', async () => {
    const dto = new SignupDto();
    dto.email = 'test@gmail.com';
    dto.password = 'password';

    jest.spyOn(service, 'signup').mockResolvedValue({
      access_token: 'some.access.token',
      refresh_token: 'some.refresh.token',
    });

    const response = await controller.signup(dto);

    expect(response).toEqual({
      access_token: 'some.access.token',
      refresh_token: 'some.refresh.token',
    });
    expect(service.signup).toHaveBeenCalled();
  });
});
