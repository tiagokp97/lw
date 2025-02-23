import express from 'express';

import authenticateUser from '../middlewares/authMiddleware.js';
import transactionController from '../controllers/transactionController.js';

const { getBalance, deposit, withdraw, transfer, getTransactions } =
  transactionController;

const transactionRoutes = express.Router();

transactionRoutes.get('/balance/', authenticateUser, getBalance);
transactionRoutes.get('/', authenticateUser, getTransactions);
transactionRoutes.post('/deposit', authenticateUser, deposit);
transactionRoutes.post('/withdraw', authenticateUser, withdraw);
transactionRoutes.post('/transfer', authenticateUser, transfer);

export default transactionRoutes;
