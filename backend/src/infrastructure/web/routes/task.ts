import { Router } from 'express';
import { basicAuth } from '../middleware/basicAuth';
import { GetAllTasksController } from '@/domains/task/presentation/controller/GetAllTasksController';
import { UpdateTaskController } from '@/domains/task/presentation/controller/UpdateTaskController';
import { CreateTaskController } from '@/domains/task/presentation/controller/CreateTaskController';

const router = Router();
const getAllTasksController = new GetAllTasksController();
const updateTaskController = new UpdateTaskController();
const createTaskController = new CreateTaskController();

router.get('/', basicAuth, getAllTasksController.handler);
router.post('/', basicAuth, createTaskController.handler);
router.put('/:id', basicAuth, updateTaskController.handler);

export default router;
