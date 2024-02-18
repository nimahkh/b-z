import { Task } from '@/domains/task/domain/entity/Task';
import { TaskService } from '@/domains/task/services/task';
import { CreateTaskDto } from '@/domains/task/domain/dto/create.dto';

export class CreateTaskCommand {
  constructor(
    public readonly userId: number,
    public readonly updateTaskDTO: CreateTaskDto
  ) {}
}

export class CreateTaskCommandHandler {
  constructor(private taskService: TaskService) {}

  async execute(query: CreateTaskCommand): Promise<Task> {
    return this.taskService.create(query.userId, query.updateTaskDTO);
  }
}
