import type { Task } from '@challenge/types';

export class UpdateTaskDto {
  title?: string;
  deadline?: Date;
  completed?: boolean;
  status?: Task['status'];
}
