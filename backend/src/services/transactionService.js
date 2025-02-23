import { PrismaClient } from '@prisma/client';
import { TransactionError } from '../errors/transactionError.js';
import { AuthError } from '../errors/AuthError.js';

const prisma = new PrismaClient();

const getBalance = async (userId) => {
  const accounts = await prisma.account.findMany({
    where: { userId },
    select: { id: true, balance: true },
  });

  if (!accounts.length) throw new TransactionError('ACCOUNT_NOT_FOUND');

  return { accounts };
};

const deposit = async (accountId, amount) => {
  return await prisma.$transaction(async (prisma) => {
    const account = await prisma.account.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      throw new TransactionError('ACCOUNT_NOT_FOUND');
    }

    const updatedAccount = await prisma.account.update({
      where: { id: accountId },
      data: { balance: { increment: amount } },
    });

    await prisma.transaction.create({
      data: {
        type: 'deposit',
        amount,
        accountId,
      },
    });

    return {
      message: `Deposit of R$ ${amount} successful!`,
      balance: updatedAccount.balance,
    };
  });
};

const getAccountByUserId = async (userId) => {
  const account = await prisma.account.findFirst({
    where: { userId },
  });

  if (!account) {
    throw new TransactionError('ACCOUNT_NOT_FOUND');
  }

  return account;
};

const withdraw = async (accountId, amount) => {
  return await prisma.$transaction(async (prisma) => {
    const account = await prisma.account.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      throw new TransactionError('ACCOUNT_NOT_FOUND');
    }
    if (account.balance < amount) {
      throw new TransactionError('INSUFFICIENT_BALANCE');
    }

    const updatedAccount = await prisma.account.update({
      where: { id: accountId },
      data: { balance: { decrement: amount } },
    });

    await prisma.transaction.create({
      data: {
        type: 'withdraw',
        amount,
        accountId,
      },
    });

    return {
      message: `Withdraw of R$ ${amount} successful!`,
      balance: updatedAccount.balance,
    };
  });
};

const transfer = async (originAccountId, destinationAccountId, amount) => {
  return await prisma.$transaction(async (prisma) => {
    const origin = await prisma.account.findUnique({
      where: { id: originAccountId },
    });
    const destination = await prisma.account.findUnique({
      where: { id: destinationAccountId },
    });

    if (!origin) throw new TransactionError('ORIGIN_ACCOUNT_NOT_FOUND');
    if (!destination)
      throw new TransactionError('DESTINATION_ACCOUNT_NOT_FOUND');
    if (origin.balance < amount)
      throw new TransactionError('INSUFFICIENT_BALANCE');

    const updatedOrigin = await prisma.account.update({
      where: { id: originAccountId },
      data: { balance: { decrement: amount } },
    });

    const updatedDestination = await prisma.account.update({
      where: { id: destinationAccountId },
      data: { balance: { increment: amount } },
    });

    await prisma.transaction.createMany({
      data: [
        { type: 'transfer_out', amount, accountId: originAccountId },
        { type: 'transfer_in', amount, accountId: destinationAccountId },
      ],
    });

    return {
      message: `Transfer of R$ ${amount} successful!`,
      origin: { id: originAccountId, balance: updatedOrigin.balance },
      destination: {
        id: destinationAccountId,
        balance: updatedDestination.balance,
      },
    };
  });
};

const getTransactions = async ({ id, month, year, type }) => {
  if (!id) {
    throw new TransactionError('ACCOUNT_NOT_FOUND');
  }

  let dateFilters = {};

  if (year) {
    dateFilters.gte = new Date(year, 0, 1);
    dateFilters.lte = new Date(year, 11, 31, 23, 59, 59);
  }

  if (month && year) {
    dateFilters.gte = new Date(year, month - 1, 1);
    dateFilters.lte = new Date(year, month - 1, 31, 23, 59, 59);
  }

  let typeFilter = {};
  if (type === 'out') {
    typeFilter = { type: 'transfer_out' };
  } else if (type === 'in') {
    typeFilter = { OR: [{ type: 'deposit' }, { type: 'transfer_in' }] };
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      accountId: id,
      createdAt: dateFilters,
      ...typeFilter,
    },
    select: {
      id: true,
      type: true,
      amount: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return { transactions };
};

export default {
  getBalance,
  deposit,
  withdraw,
  transfer,
  getAccountByUserId,
  getTransactions,
};
