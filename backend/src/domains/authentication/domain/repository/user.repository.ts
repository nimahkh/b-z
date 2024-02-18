import { CreateUserDto } from '../dto/create.dto';
import { User } from '../entities/User';

export interface IUserRepository {
  findById(id: number): Promise<User | null>;
  findByUserName(username: string): Promise<User | null>;
  create(user: CreateUserDto): Promise<User>;
}
