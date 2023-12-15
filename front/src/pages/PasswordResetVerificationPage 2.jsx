// PasswordResetVerificationPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import apiService from '../services/apiService';

function PasswordResetVerificationPage() {
    const [verificationStatus, setVerificationStatus] = useState('Verifying...');
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            verifyEmailForPasswordReset(token);
        } else {
            setVerificationStatus('Invalid verification link.');
        }
    }, [location]);

    const verifyEmailForPasswordReset = async (token) => {
        try {
            const response = await apiService.get(`/user/verify-for-password-reset?token=${token}`);
            setVerificationStatus('Your email has been successfully verified for password reset!');
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
