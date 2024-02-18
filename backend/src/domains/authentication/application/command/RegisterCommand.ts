import { UserService } from '@/domains/authentication/services/user';
import { CreateUserDto } from '@/domains/authentication/domain/dto/create.dto';
import { User } from '@/domains/authentication/domain/entities/User';

export class RegisterCommand {
  constructor(public readonly user: CreateUserDto) {}
}

export class RegisterCommandHandler {
  constructor(private userService: UserService) {}

  async execute(query: RegisterCommand): Promise<User> {
    const user = await this.userService.createUser(query.user);
    return user;
  }
}
