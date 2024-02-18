import { Request, Response } from 'express';
import {
  GetTasksQueryHandler,
  GetTasksQuery,
} from '@/domains/task/application/query/getTasksQuery';
import { TaskRepository } from '@/domains/task/infrastructure/task.repository.impl';
import { TaskService } from '../../services/task';
import { DatabaseConfig } from '@/infrastructure/config/database.config';

export class GetAllTasksController {
  taskService: TaskService;

  constructor() {
    this.taskService = new TaskService(new TaskRepository(DatabaseConfig));
  }

  handler = async (req: Request, res: Response) => {
    const userId = req?.user?.id || 0;
    const handler = new GetTasksQueryHandler(this.taskService);
    const command = new GetTasksQuery(userId);
    const tasks = await handler.execute(command);
    res.json(tasks);
  };
}
