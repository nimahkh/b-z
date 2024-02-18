import type { User } from '@/domains/authentication/domain/entities/User';
import type { Task } from '@challenge/types';

export class CreateTaskDto {
  title: string;
  deadline: Date;
  completed: boolean;
  status: Task['status'];
  user: User;
}
