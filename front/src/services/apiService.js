// apiService.js
import axios from 'axios';

const apiService = axios.create({
    baseURL: 'http://localhost:8080/'
});

apiService.interceptors.request.use(config => {
    const token = sessionStorage.getItem('jwtToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiService.getEmail = async () => {
    try {
        const response = await apiService.get('/get-email');
        return response.data; // The email
    } catch (error) {
        console.error('Error fetching email:', error);
        return null;
    }
};

export default apiService;
