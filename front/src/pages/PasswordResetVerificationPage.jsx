// PasswordResetVerificationPage.jsx
import { useEffect, useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import apiService from '../services/apiService';

function PasswordResetVerificationPage() {
    const [verificationStatus, setVerificationStatus] = useState('Verifying...');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            verifyEmailForPasswordReset(token);
        } else {
            setVerificationStatus('Invalid verification link.');
        }
    }, [location, navigate]);

    const verifyEmailForPasswordReset = async (token) => {
        try {
            await apiService.get(`/user/verify-for-password-reset?token=${token}`);
            setVerificationStatus('Your email has been successfully verified for password reset!');
            // Optionally close the window or redirect
            window.close(); // Close current tab if opened via link
            navigate('/password-change'); // Redirect to password change page
        } catch (error) {
            setVerificationStatus('Failed to verify email. Please try again or contact support.');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Email Verification for Password Reset</h1>
            <p>{verificationStatus}</p>
        </div>
    );
}

export default PasswordResetVerificationPage;
