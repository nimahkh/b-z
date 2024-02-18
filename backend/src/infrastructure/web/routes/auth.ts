import { Router } from 'express';
import { LoginController } from '@/domains/authentication/presentation/controller/LoginController';
import { RegisterController } from '@/domains/authentication/presentation/controller/RegisterController';

const router = Router();
const loginController = new LoginController();
const registerController = new RegisterController();

router.post('/register', registerController.handler);
router.post('/login', loginController.handler);

export default router;
