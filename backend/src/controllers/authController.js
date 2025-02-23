import * as authService from '../services/authService.js';
import { AuthError } from '../errors/AuthError.js';

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await authService.authenticateUser(username, password);

    if (!result) throw new AuthError('User not Found', 404);

    res.cookie('token', result.token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(error.statusCode || 400).json({ error: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { username, password, amount } = req.body;
    const result = await authService.registerUser(username, password, amount);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie('token', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ error: 'Error during logout' });
  }
};

export default {
  register,
  login,
  logout,
};
