import { UserService } from '@/domains/authentication/services/user';
import jwt from 'jsonwebtoken';

export class LoginCommand {
  constructor(
    public readonly username: string,
    public readonly password: string,
    public readonly jwt_token: string
  ) {}
}

export class LoginCommandHandler {
  constructor(private userService: UserService) {}

  async execute(
    query: LoginCommand
  ): Promise<{ token?: string; message?: string }> {
    const { username, password, jwt_token } = query;
    if (!username || !password) {
      return { message: 'Username and password are required' };
    }

    try {
      const user = await this.userService.validateUser(username, password);
      if (!user) {
        return { message: 'Invalid credentials' };
      }

      const token = jwt.sign(
        { userId: user.id, username: user.username },
        jwt_token,
        { expiresIn: '1d' }
      );

      return { token };
    } catch (error) {
      return { message: 'Authentication failed' };
    }
  }
}
