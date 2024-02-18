import { Router } from 'express';
import taskRoutes from './task';
import userAuth from './auth';

const router = Router();

router.use('/tasks', taskRoutes);
router.use('/auth', userAuth);

export default router;
