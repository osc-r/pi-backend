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

  findAll(keyword?: string) {
    return this.userRepository.findAllByKeyword(keyword);
  }

  findOneById(id: string) {
    return this.userRepository.findOneById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOneById(id);
    await this.userRepository.update({ id: user.id }, updateUserDto);
    return updateUserDto;
  }

  remove(id: string) {
    return this.userRepository.softRemove({ id });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneByEmail(email);
  }
}
