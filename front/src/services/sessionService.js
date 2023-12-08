import apiService from "./apiService.js";

class SessionService {
    // Function to decode JWT token
    static decodeJWT(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

        return JSON.parse(jsonPayload);
    }

    // Function to get the JWT token from session storage
    static getToken() {
        return sessionStorage.getItem('jwtToken');
    }

    // Function to get userId from the token
    static getUserId() {
        const token = this.getToken();
        if (!token) return null;

        const payload = this.decodeJWT(token);
        return payload.userId;
    }

    // Function to get userEmail using userId
    static async getUserEmail() {
        const userId = this.getUserId();
        if (!userId) return null;

        try {
            const email = await apiService.getEmailByUserId(userId);
            return email;
        } catch (error) {
            console.error('Error fetching email:', error);
            return null;
        }
    }
}
export default SessionService;