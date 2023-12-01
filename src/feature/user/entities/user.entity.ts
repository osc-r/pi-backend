import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    enum: [UserRole.ADMIN, UserRole.USER],
    default: UserRole.USER,
    type: 'enum',
  })
  role: UserRole;

  @Column({ nullable: true })
  firstname?: string;

  @Column({ nullable: true })
  lastname?: string;

  @Column({ name: 'date_of_birth', nullable: true })
  dateOfBirth?: Date;

  toJSON() {
    delete this.password;
    delete this.role;
    return this;
  }
}
