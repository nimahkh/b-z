import { Task } from '@/domains/task/domain/entity/Task';
import { TaskService } from '@/domains/task/services/task';
import { UpdateTaskDto } from '@/domains/task/domain/dto/update.dto';

export class UpdateTaskCommand {
  constructor(
    public readonly taskId: number,
    public readonly updateTaskDTO: UpdateTaskDto
  ) {}
}

export class UpdateTaskCommandHandler {
  constructor(private taskService: TaskService) {}

  async execute(query: UpdateTaskCommand): Promise<Task> {
    return this.taskService.update(query.taskId, query.updateTaskDTO);
  }
}
