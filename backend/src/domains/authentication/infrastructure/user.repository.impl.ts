import { DataSource, Repository } from 'typeorm';
import { User } from '@/domains/authentication/domain/entities/User';
import { IUserRepository } from '@/domains/authentication/domain/repository/user.repository';
import { Service } from 'typedi';
import { CreateUserDto } from '../domain/dto/create.dto';

@Service()
export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(User);
  }

  async findById(id: number): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.repository.create(createUserDto);
    return this.repository.save(user);
  }

  async findByUserName(username: string): Promise<User | null> {
    return this.repository.findOneBy({ username: username });
  }
}
