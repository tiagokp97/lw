import { createUserAccount } from '../services/accountService.js';
import jwt from 'jsonwebtoken';

export const createAccountForUser = async (req, res) => {
  let userId;

  try {
    const token = req.cookies.token;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.userId;
    }

    if (!userId) {
      userId = req.body.userId;
    }

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const amount = req.body.amount || 0;

    const account = await createUserAccount(userId, amount);
    res.status(201).json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
