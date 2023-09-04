import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post('/signup', AuthController.signup);
router.post('/sign-in', AuthController.login);

export const AuthRoutes = router;
