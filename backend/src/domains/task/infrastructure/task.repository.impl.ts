import { DataSource, Repository } from 'typeorm';
import { Task } from '@/domains/task/domain/entity/Task';
import { ITaskRepository } from '@/domains/task/domain/repository/task.repository';
import { CreateTaskDto } from '@/domains/task/domain/dto/create.dto';
import { UpdateTaskDto } from '@/domains/task/domain/dto/update.dto';
import { Service } from 'typedi';

@Service()
export class TaskRepository implements ITaskRepository {
  private repository: Repository<Task>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(Task);
  }

  async findAllByUserId(id: number): Promise<Task[]> {
    return this.repository.find({
      where: {
        user: { id },
      },
    });
  }

  async findById(id: number): Promise<Task | null> {
    return this.repository.findOneBy({ id });
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.repository.create(createTaskDto) as Task;
    return this.repository.save(task);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const result = await this.repository.update(id, updateTaskDto);
    if (result.affected === 0) {
      throw new Error(`Task with ID ${id} not found.`);
    }
    const updatedTask = await this.findById(id);
    if (!updatedTask) {
      throw new Error(`Task with ID ${id} not found after update.`);
    }
    return updatedTask;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
