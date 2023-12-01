import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findOneById(id: string) {
    const user = await this.findOne({
      where: { id },
      withDeleted: false,
    });
    if (!user) {
      throw new NotFoundException(`user(id=${id}) not found`);
    }
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.findOne({
      where: { email },
      withDeleted: false,
    });
    if (!user) {
      throw new NotFoundException(`user(email=${email}) not found`);
    }
    return user;
  }
}
