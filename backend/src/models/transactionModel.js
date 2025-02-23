import db from '../config/db.js';

const createUser = async (username, hashedPassword) => {
  const [result] = await db.execute(
    'INSERT INTO users (username, password, balance) VALUES (?, ?, ?)',
    [username, hashedPassword, 100]
  );
  return result.insertId;
};

const findUserByUsername = async (username) => {
  const [users] = await db.execute('SELECT * FROM users WHERE username = ?', [
    username,
  ]);
  return users[0];
};

const updateUserBalance = async (userId, amount) => {
  await db.execute('UPDATE users SET balance = balance + ? WHERE id = ?', [
    amount,
    userId,
  ]);
};

const getUserBalance = async (userId) => {
  const [users] = await db.execute('SELECT balance FROM users WHERE id = ?', [
    userId,
  ]);
  return users[0]?.balance;
};

export default {
  createUser,
  findUserByUsername,
  updateUserBalance,
  getUserBalance,
};
