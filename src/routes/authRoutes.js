import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  registerUserSchema,
  loginUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validations/authValidation.js';

import {
  registerUser,
  loginUser,
  refreshUserSession,
  logoutUser,
  requestResetEmail,
  resetPassword,
} from '../controllers/authController.js';

const authRoutes = Router();

authRoutes.post('/register', celebrate(registerUserSchema), registerUser);

authRoutes.post('/login', celebrate(loginUserSchema), loginUser);

authRoutes.post('/refresh', refreshUserSession);

authRoutes.post('/logout', logoutUser);

authRoutes.post(
  '/request-reset-email',
  celebrate(requestResetEmailSchema),
  requestResetEmail,
);
authRoutes.post(
  '/reset-password',
  celebrate(resetPasswordSchema),
  resetPassword,
);

export default authRoutes;
