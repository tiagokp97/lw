import axios from 'axios';

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.error('🔴 Token expired. Logging out...');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (config) => {
    const authToken = 'token';

    config.headers['Cookie'] = `token=${authToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
