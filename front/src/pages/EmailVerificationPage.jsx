import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

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
            const response = await axios.get(`http://localhost:8080/user/verify?token=${token}`);
            // Handle the positive response here
            setVerificationStatus('Your email has been successfully verified!');
        } catch (error) {
            // Handle the negative response here
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
