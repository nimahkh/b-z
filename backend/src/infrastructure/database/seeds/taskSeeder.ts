import { DataSource } from 'typeorm';
import { Task } from '@/domains/task/domain/entity/Task';
import { User } from '@/domains/authentication/domain/entities/User';

const taskData = [
  {
    title: 'Task 1',
    userId: 1,
    deadline: new Date(),
    completed: false,
    status: 'todo',
  },
  {
    title: 'Task 2',
    userId: 1,
    deadline: new Date(),
    completed: false,
    status: 'todo',
  },
  {
    title: 'Task 1',
    userId: 2,
    deadline: new Date(),
    completed: false,
    status: 'todo',
  },
  {
    title: 'Task 2',
    userId: 2,
    deadline: new Date(),
    completed: false,
    status: 'todo',
  },
];

export const seedTasks = async (dataSource: DataSource) => {
  const taskRepository = dataSource.getRepository(Task);
  const userRepository = dataSource.getRepository(User);

  for (const task of taskData) {
    const user = await userRepository.findOneBy({ id: task.userId });
    if (user) {
      const existingTask = await taskRepository.findOneBy({
        title: task.title,
        user: user,
      });
      if (!existingTask) {
        const newTask = taskRepository.create({ ...task, user });
        await taskRepository.save(newTask);
        console.log(`Task ${task.title} created.`);
      } else {
        console.log(`Task ${task.title} already exists. Skipping.`);
      }
    }
  }
  console.log('Task seeding completed.');
};
