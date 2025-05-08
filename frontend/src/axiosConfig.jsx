import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:5001', // local
  baseURL: 'http://3.27.123.11', // live
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Token being used:', token);
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.warn('No token found in localStorage');
    }
    return config;
  },
  (error) => {
    console.error('Axios request error:', error);
    return Promise.reject(error);
  }
);
export default instance;
