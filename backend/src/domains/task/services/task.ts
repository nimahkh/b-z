import 'reflect-metadata';
import { TaskRepository } from '../infrastructure/task.repository.impl';
import { CreateTaskDto } from '../domain/dto/create.dto';
import { UpdateTaskDto } from '../domain/dto/update.dto';
import { Task } from '../domain/entity/Task';
import { Service, Inject } from 'typedi';
import { User } from '@/domains/authentication/domain/entities/User';

@Service()
export class TaskService {
  taskRepository: TaskRepository;

  constructor(@Inject() taskRepo: TaskRepository) {
    this.taskRepository = taskRepo;
  }

  async findAllByUserId(id: number): Promise<Task[]> {
    return this.taskRepository.findAllByUserId(id);
  }

  async findById(id: number): Promise<Task | null> {
    return this.taskRepository.findById(id);
  }

  async create(userId: number, createTaskDto: CreateTaskDto): Promise<Task> {
    createTaskDto.user = { id: userId } as User;
    return this.taskRepository.create(createTaskDto);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.taskRepository.update(id, updateTaskDto);
  }

  async delete(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
