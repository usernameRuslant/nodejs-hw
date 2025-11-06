import { Router } from 'express';
import { celebrate } from 'celebrate';
import { registerUserSchema } from '../validations/authValidation.js';
import { registerUser } from '../controllers/authController.js';

const authRoutes = Router();

authRoutes.post('/register', celebrate(registerUserSchema), registerUser);

export default authRoutes;
