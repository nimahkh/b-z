import { Request, Response } from 'express';
import { TaskRepository } from '@/domains/task/infrastructure/task.repository.impl';
import { TaskService } from '@/domains/task/services/task';
import { DatabaseConfig } from '@/infrastructure/config/database.config';
import {
  CreateTaskCommandHandler,
  CreateTaskCommand,
} from '@/domains/task/application/command/CreateTaskCommand';
import { CreateTaskDto } from '@/domains/task/domain/dto/create.dto';
import { Task } from '@/domains/task/domain/entity/Task';

export class CreateTaskController {
  taskService: TaskService;

  constructor() {
    this.taskService = new TaskService(new TaskRepository(DatabaseConfig));
  }

  handler = async (req: Request, res: Response) => {
    const taskRepository = DatabaseConfig.getRepository(Task);
    const taskObject = req.body as CreateTaskDto;
    const userId = req?.user?.id || 0;
    const handler = new CreateTaskCommandHandler(this.taskService);
    const command = new CreateTaskCommand(userId, taskObject);

    const tasks = await handler.execute(command);
    taskRepository.save(tasks);

    res.json(tasks);
  };
}
