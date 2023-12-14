import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import apiService from '../services/apiService';

function EmailVerificationPage() {
    const [verificationStatus, setVerificationStatus] = useState('Verifying...');
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            verifyEmail(token);
        } else {
            setVerificationStatus('Invalid verification link.');
        }
    }, [location]);

    const verifyEmail = async (token) => {
        try {
            const response = await apiService.get(`/user/verify?token=${token}`);
            setVerificationStatus('Your email has been successfully verified!');

            // Close the window after a delay
            setTimeout(() => {
                window.close();
            }, 800); // 0.8 seconds delay
        } catch (error) {
            setVerificationStatus('Failed to verify email. Please try again or contact support.');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Email Verification</h1>
            <p>{verificationStatus}</p>
        </div>
    );
}

export default EmailVerificationPage;
