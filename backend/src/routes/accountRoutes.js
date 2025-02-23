import express from 'express';
import { createAccountForUser } from '../controllers/accountController.js';

const accountRoutes = express.Router();

accountRoutes.post('/create', createAccountForUser);

export default accountRoutes;
