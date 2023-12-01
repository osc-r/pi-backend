import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';
import { DatabaseTestModule } from '../../util/database-test-module';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseTestModule, TypeOrmModule.forFeature([User])],
      controllers: [UserController],
      providers: [UserService, UserRepository],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should findOneByCurrentUser success', async () => {
    const user = new User();
    user.id = 'user-id';

    jest.spyOn(service, 'findOneById').mockResolvedValue(user);

    const response = await controller.findOneByCurrentUser(user);

    expect(response).toEqual(user.toJSON());
    expect(service.findOneById).toHaveBeenCalled();
  });

  it('should updateByCurrentUser success', async () => {
    const user = new User();
    user.id = 'user-id';

    const dto = new UpdateUserDto();
    dto.firstname = 'test';

    jest.spyOn(service, 'update').mockResolvedValue(dto);

    const response = await controller.updateByCurrentUser(user, dto);

    expect(response).toEqual(dto);
    expect(service.update).toHaveBeenCalled();
  });

  it('should create success', async () => {
    const user = new User();
    user.id = 'user-id';

    const dto = new CreateUserDto();
    dto.firstname = 'test';

    jest.spyOn(service, 'create').mockResolvedValue(user);

    const response = await controller.create(dto);

    expect(response).toEqual(user);
    expect(service.create).toHaveBeenCalled();
  });

  it('should findAll success', async () => {
    const user = new User();
    user.id = 'user-id';

    jest.spyOn(service, 'findAll').mockResolvedValue([user]);

    const response = await controller.findAll();

    expect(response.length).toEqual(1);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should remove success', async () => {
    const user = new User();
    user.id = 'user-id';

    jest.spyOn(service, 'remove').mockResolvedValue(user);

    const response = await controller.remove(user.id);

    expect(response).toEqual(user);
    expect(service.remove).toHaveBeenCalled();
  });
});
