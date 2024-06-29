import express from 'express';
import UserController from '../controllers/UserController.js';
import authenticateToken from '../middleware/protectedRoute.js';

const router = express.Router();

router.post('/users/save_user', UserController.createUser);

router.get('/users/:id',authenticateToken, UserController.getUserById);

export default router;
