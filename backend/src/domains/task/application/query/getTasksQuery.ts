import { Task } from '@/domains/task/domain/entity/Task';
import { TaskService } from '../../services/task';

export class GetTasksQuery {
  constructor(public readonly userId: number) {}
}

export class GetTasksQueryHandler {
  constructor(private taskService: TaskService) {}

  async execute(query: GetTasksQuery): Promise<Task[]> {
    return this.taskService.findAllByUserId(query.userId);
  }
}
