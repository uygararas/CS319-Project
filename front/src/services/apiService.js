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

// Add a new method to fetch email by userId
apiService.getEmailByUserId = async (userId) => {
    try {
        const response = await apiService.get(`/getEmailByUserId?userId=${userId}`);
        return response.data; // The email
    } catch (error) {
        console.error('Error fetching email by userId:', error);
        return null;
    }
};

export default apiService;
