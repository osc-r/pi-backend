import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../user/repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { DatabaseTestModule } from '../../util/database-test-module';
import { SigninDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseTestModule, TypeOrmModule.forFeature([User])],
      providers: [
        AuthService,
        UserService,
        JwtService,
        ConfigService,
        UserRepository,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should signin success', async () => {
    const dto = new SigninDto();
    dto.email = 'test@gmail.com';
    dto.password = 'password';

    const user = new User();
    user.email = dto.email;
    user.password = 'somehashpassword';

    jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(user);
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation((password, comparePassword) => {
        return Promise.resolve(true);
      });
    jest
      .spyOn(jwtService, 'signAsync')
      .mockResolvedValueOnce('some.access.token')
      .mockResolvedValueOnce('some.refresh.token');

    const result = await service.signin(dto);
    expect(result.access_token).toBe('some.access.token');
    expect(result.refresh_token).toBe('some.refresh.token');
  });

  it('should signup success', async () => {
    const dto = new SignupDto();
    dto.email = 'test@gmail.com';
    dto.password = 'password';

    const user = new User();
    user.email = dto.email;
    user.password = 'somehashpassword';

    jest.spyOn(bcrypt, 'hash').mockImplementation((password, salt) => {
      return Promise.resolve('somehashpassword');
    });
    jest.spyOn(userService, 'create').mockResolvedValue(user);
    jest
      .spyOn(jwtService, 'signAsync')
      .mockResolvedValueOnce('some.access.token')
      .mockResolvedValueOnce('some.refresh.token');

    const result = await service.signup(dto);
    expect(result.access_token).toBe('some.access.token');
    expect(result.refresh_token).toBe('some.refresh.token');
  });

  it('should signin failed when password mismatch', async () => {
    const dto = new SigninDto();
    dto.email = 'test@gmail.com';
    dto.password = 'password';

    const user = new User();
    user.email = dto.email;
    user.password = 'somehashpassword';

    jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(user);
    jest
      .spyOn(bcrypt, 'compare')
      .mockImplementation((password, comparePassword) => {
        return Promise.resolve(false);
      });

    expect(() => service.signin(dto)).rejects.toThrow(
      new BadRequestException('email or password mismatch'),
    );
  });

  it('should signin failed when user not found', async () => {
    const dto = new SigninDto();
    dto.email = 'test@gmail.com';
    dto.password = 'password';

    jest.spyOn(userService, 'findOneByEmail').mockImplementation(() => {
      throw new NotFoundException();
    });

    expect(() => service.signin(dto)).rejects.toThrow(new NotFoundException());
  });
});
