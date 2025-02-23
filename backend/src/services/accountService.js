import { findAccountByUserId, createAccount } from '../models/accountModel.js';
import generateAccountId from '../utils/generateAccountId.js';

export const createUserAccount = async (userId, amount = 0) => {
  const accountId = await generateAccountId();
  return await createAccount(userId, accountId, amount);
};
