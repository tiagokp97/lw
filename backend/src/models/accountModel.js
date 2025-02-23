import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findAccountByUserId = async (userId) => {
  return await prisma.account.findFirst({
    where: { userId },
  });
};

export const createAccount = async (userId, accountId, balance) => {
  return await prisma.account.create({
    data: {
      id: accountId,
      userId,
      balance,
    },
  });
};
