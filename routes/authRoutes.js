import express from 'express';
import AuthController from '../controllers/AuthController.js';

const router = express.Router();

router.post('/users/login', AuthController.authUser);

export default router;