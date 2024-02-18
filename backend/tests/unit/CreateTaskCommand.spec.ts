import { CreateTaskCommand, CreateTaskCommandHandler } from '@/domains/task/application/command/CreateTaskCommand';
import { CreateTaskDto } from '@/domains/task/domain/dto/create.dto';

describe('CreateTaskCommandHandler', () => {
    it('should call TaskService.create with correct parameters', async () => {
        const mockTaskService = {
            create: jest.fn()
        };
        mockTaskService.create.mockResolvedValue({
            id: 1,
            title: 'Test Task',
            deadline: new Date(),
            completed: false,
            status: 'todo',
            user: { id: 1, username: 'test', password: "dummy", tasks: [] }
        });

        const commandHandler = new CreateTaskCommandHandler(mockTaskService as any);
        const userId: number = 1;
        const taskDTO: CreateTaskDto = {
            title: 'Test Task',
            deadline: new Date(),
            completed: false,
            status: 'todo',
            user: { id: 1, username: 'test', password: "dummy", tasks: [] }
        };

        const result = await commandHandler.execute(new CreateTaskCommand(userId, taskDTO));

        expect(mockTaskService.create).toHaveBeenCalledTimes(1);
        expect(mockTaskService.create).toHaveBeenCalledWith(userId, taskDTO);
        expect(result).toEqual(expect.objectContaining({
            id: 1,
            title: 'Test Task',
        }));
    });
});
