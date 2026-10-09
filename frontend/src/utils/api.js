import axios from 'axios';

const API_URL = 'https://dolphino-pool.onrender.com/api';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const adminInfo = localStorage.getItem('adminInfo');
    if (adminInfo) {
        const { token } = JSON.parse(adminInfo);
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
