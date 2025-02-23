import express from 'express';
import transactionRoutes from './transactionRoutes.js';
import authRoutes from './authRoutes.js';
import accountRoutes from './accountRoutes.js';

const router = express.Router();

router.use('/transaction', transactionRoutes);
router.use('/auth', authRoutes);
router.use('/account', accountRoutes);

export default router;
