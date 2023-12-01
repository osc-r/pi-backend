import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  firstname?: string;

  @Column({ nullable: true })
  lastname?: string;

  @Column({ name: 'date_of_birth', nullable: true })
  dateOfBirth?: Date;

  toJSON() {
    delete this.password;
    return this;
  }
}
