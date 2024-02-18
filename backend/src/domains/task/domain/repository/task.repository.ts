import { Task } from '../entity/Task';
import { CreateTaskDto } from '../dto/create.dto';
import { UpdateTaskDto } from '../dto/update.dto';

export interface ITaskRepository {
  findAllByUserId(id: number): Promise<Task[]>;
  findById(id: number): Promise<Task | null>;
  create(createTaskDto: CreateTaskDto): Promise<Task>;
  update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task>;
  delete(id: number): Promise<void>;
}
