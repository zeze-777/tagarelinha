import axios from 'axios';

const API_BASE_URL = 'https://api-tagarelinha.onrender.com';

const api = axios.create({
  baseURL: `${API_BASE_URL}/`
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api, API_BASE_URL };