import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.post('/users/save_user', UserController.createUser);
router.get('/users/:id', UserController.getUserById);

export default router;
