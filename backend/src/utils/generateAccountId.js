import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const generateAccountId = async () => {
  let newId;
  let exists = true;

  while (exists) {
    newId = Math.floor(1000 + Math.random() * 9000);
    exists = await prisma.account.findUnique({ where: { id: newId } });
  }

  return newId;
};

export default generateAccountId;
