import { IUserRepository } from '../domain/repository/user.repository';
import { User } from '../domain/entities/User';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Service } from 'typedi';
import { CreateUserDto } from '../domain/dto/create.dto';
import bcrypt from 'bcrypt';

@Service()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: IUserRepository
  ) {}

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async findByUserName(username: string): Promise<User | null> {
    return this.userRepository.findByUserName(username);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createUserDtoWithHashedPassword = {
      username: createUserDto.username,
      password: hashedPassword,
    } as CreateUserDto;
    return this.userRepository.create(createUserDtoWithHashedPassword);
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByUserName(username);
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return null;
    }
    return user;
  }
}
