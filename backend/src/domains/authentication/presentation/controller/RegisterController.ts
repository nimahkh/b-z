import { Request, Response } from 'express';
import { DatabaseConfig } from '@/infrastructure/config/database.config';
import {
  RegisterCommandHandler,
  RegisterCommand,
} from '@/domains/authentication/application/command/RegisterCommand';
import { UserService } from '@/domains/authentication/services/user';
import { UserRepository } from '@/domains/authentication/infrastructure/user.repository.impl';

export class RegisterController {
  userService: UserService;

  constructor() {
    this.userService = new UserService(new UserRepository(DatabaseConfig));
  }

  handler = async (req: Request, res: Response) => {
    const handler = new RegisterCommandHandler(this.userService);
    const command = new RegisterCommand(req.body);

    const register = await handler.execute(command);

    res.json(register);
  };
}
