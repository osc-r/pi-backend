import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find()
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      withDeleted: false,
    });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    await this.userRepository.update({ id: user.id }, updateUserDto);
    return updateUserDto;
  }

  remove(id: string) {
    return this.userRepository.softRemove({ id });
  }
}
