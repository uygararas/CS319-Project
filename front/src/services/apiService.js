// apiService.js
//THIS IS THE MOST IMPORTANT CLASS IN OUR PROJECT IT IS FOR SESSION CONTROL IN THIS CLASS WE MANAGE THE
// USER TOKENS IN AXIOS COMMANDS BY API SERVICE
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

apiService.checkEmailVerificationStatus = async (email) => {
    try {
        // Replace '/check-verification-status' with your actual endpoint
        const response = await apiService.get(`/check-verification-status?email=${encodeURIComponent(email)}`);
        return response.data; // Expected to return an object with isEmailVerifiedForPasswordChange flag
    } catch (error) {
        console.error('Error checking email verification status:', error);
        return { isEmailVerifiedForPasswordChange: false };
    }
};

export default apiService;
