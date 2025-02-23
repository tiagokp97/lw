import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { findUserByUsername, createUser } from '../models/authModel.js';
import { createUserAccount } from './accountService.js';
import { PrismaClient } from '@prisma/client';
import { AuthError } from '../errors/AuthError.js';

const prisma = new PrismaClient();

export const registerUser = async (username, password, amount) => {
  return await prisma.$transaction(async (prisma) => {
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      throw new AuthError('USERNAME_EXISTS');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(username, hashedPassword);

    const account = await createUserAccount(newUser.id, amount);

    return { user: newUser, account };
  });
};

export const authenticateUser = async (username, password) => {
  const user = await findUserByUsername(username);
  if (!user) throw new AuthError('USER_NOT_FOUND');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AuthError('INVALID_PASSWORD');

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    config.jwtSecret,
    { expiresIn: '1h' }
  );

  return { token };
};
