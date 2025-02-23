import jwt from 'jsonwebtoken';
import transactionService from '../services/transactionService.js';

const getBalance = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Não autorizado' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const result = await transactionService.getBalance(userId);

    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const deposit = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Não autorizado' });

    const accountId = req.body.id;

    const { amount } = req.body;
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Valor inválido para depósito' });
    }

    const result = await transactionService.deposit(accountId, Number(amount));

    res.status(201).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const withdraw = async (req, res) => {
  try {
    const { amount } = req.body;
    const accountId = req.body.id;

    const result = await transactionService.withdraw(
      Number(accountId),
      Number(amount)
    );
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

const transfer = async (req, res) => {
  try {
    const { origin, destination, amount } = req.body;
    const result = await transactionService.transfer(
      Number(origin),
      Number(destination),
      Number(amount)
    );
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};
const getTransactions = async (req, res, next) => {
  try {
    const { id, month, year, type } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'O ID da conta é obrigatório' });
    }

    const transactions = await transactionService.getTransactions({
      id: Number(id),
      month,
      year,
      type,
    });

    res.json(transactions);
  } catch (error) {
    console.error('Error getting transactions:', error);
    next(error);
  }
};

export default {
  getBalance,
  deposit,
  withdraw,
  transfer,
  getTransactions,
};
