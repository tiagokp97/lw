import api from './api';

export const loginUser = async ({ username, password }) => {
  const { data } = await api.post(
    '/auth/login',
    { username, password },
    { withCredentials: true }
  );

  return data;
};

export const registerUser = async ({ username, password, amount }) => {
  const { data } = await api.post(
    '/auth/register',
    { username, password, amount },
    { withCredentials: true }
  );

  return data;
};
