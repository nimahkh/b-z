import { Request, Response } from 'express';
import { TaskRepository } from '@/domains/task/infrastructure/task.repository.impl';
import { TaskService } from '@/domains/task/services/task';
import { DatabaseConfig } from '@/infrastructure/config/database.config';
import {
  UpdateTaskCommand,
  UpdateTaskCommandHandler,
} from '@/domains/task/application/command/UpdateTaskCommand';
import { UpdateTaskDto } from '@/domains/task/domain/dto/update.dto';

export class UpdateTaskController {
  taskService: TaskService;

  constructor() {
    this.taskService = new TaskService(new TaskRepository(DatabaseConfig));
  }

  handler = async (req: Request, res: Response) => {
    let task = await this.taskService.findById(parseInt(req.params.id));
    const updates = req.body as UpdateTaskDto;
    if (!task) {
      res.status(404).send('Task not found');
      return;
    }
    const handler = new UpdateTaskCommandHandler(this.taskService);
    const command = new UpdateTaskCommand(parseInt(req.params.id), updates);

    const tasks = await handler.execute(command);
    res.json(tasks);
  };
}
