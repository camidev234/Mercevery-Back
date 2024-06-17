import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.post('/user/save_user', UserController.createUser);

export default router;
