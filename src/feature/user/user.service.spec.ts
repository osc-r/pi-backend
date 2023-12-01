import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';
import { DatabaseTestModule } from '../../util/database-test-module';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateResult } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let userRepo: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseTestModule, TypeOrmModule.forFeature([User])],
      providers: [UserService, UserRepository],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepo = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create success', async () => {
    const user = new User();
    user.id = 'user-id';

    const dto = new CreateUserDto();
    dto.email = 'test@gmail.com';
    dto.password = 'hashpassword';

    jest
      .spyOn(userRepo, 'save')
      .mockImplementation(() => Promise.resolve(user));

    const result = await service.create(dto);
    expect(result.id).toBe(user.id);
  });

  it('should create success with admin role', async () => {
    const user = new User();
    user.id = 'user-id';
    user.role = UserRole.ADMIN;

    const dto = new CreateUserDto();
    dto.email = 'test@gmail.com';
    dto.password = 'hashpassword';
    dto.isAdmin = true;

    jest
      .spyOn(userRepo, 'save')
      .mockImplementation(() => Promise.resolve(user));

    const result = await service.create(dto);
    expect(result.id).toBe(user.id);
    expect(result.role).toBe(UserRole.ADMIN);
  });

  it('should findAll success', async () => {
    const user = new User();
    user.id = 'user-id';

    jest.spyOn(userRepo, 'findAllByKeyword').mockResolvedValue([user]);

    const result = await service.findAll();
    expect(result.length).toBe(1);
  });

  it('should findOneById success', async () => {
    const user = new User();
    user.id = 'user-id';

    jest.spyOn(userRepo, 'findOneById').mockResolvedValue(user);

    const result = await service.findOneById(user.id);
    expect(result).toBe(user);
  });

  it('should update success', async () => {
    const user = new User();
    user.id = 'user-id';

    const dto = new UpdateUserDto();
    dto.firstname = 'test';

    jest.spyOn(userRepo, 'findOneById').mockResolvedValue(user);
    jest.spyOn(userRepo, 'update').mockImplementation(() => {
      return Promise.resolve(new UpdateResult());
    });

    const result = await service.update(user.id, dto);

    expect(result).toEqual(dto);
  });

  it('should remove success', async () => {
    const user = new User();
    user.id = 'user-id';

    jest.spyOn(userRepo, 'softRemove').mockResolvedValue(user);

    const result = await service.remove(user.id);

    expect(result).toEqual(user);
  });

  it('should findOneByEmail success', async () => {
    const user = new User();
    user.id = 'user-id';
    user.email = 'test@gmail.com';

    jest.spyOn(userRepo, 'findOneByEmail').mockResolvedValue(user);

    const result = await service.findOneByEmail(user.email);

    expect(result).toEqual(user);
  });
});
