import express from 'express';
import authController from '../controllers/authController.js';

const { register, login, logout } = authController;
const authRoutes = express.Router();

authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.post('/logout', logout);

export default authRoutes;
