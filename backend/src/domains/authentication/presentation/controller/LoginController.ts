import { Request, Response } from 'express';
import { DatabaseConfig } from '@/infrastructure/config/database.config';
import {
  LoginCommandHandler,
  LoginCommand,
} from '@/domains/authentication/application/command/LoginCommand';
import { UserService } from '@/domains/authentication/services/user';
import { UserRepository } from '../../infrastructure/user.repository.impl';
const JWT_SECRET = 'your_jwt_secret';

export class LoginController {
  userService: UserService;

  constructor() {
    this.userService = new UserService(new UserRepository(DatabaseConfig));
  }

  handler = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const handler = new LoginCommandHandler(this.userService);
    const command = new LoginCommand(username, password, JWT_SECRET);

    const login = await handler.execute(command);
    if (login.message) {
      res.status(500).json({ message: 'Authentication failed' });
      return;
    }
    res.json(login);
  };
}
