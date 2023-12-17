//this is the page that is firstly beign used after password has been forgotten only the email is
//entered than an email is sent to check if the entered email is a users email
import { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import withBackButtonListener from '../components/withBackButtonListener.jsx';

// eslint-disable-next-line react-refresh/only-export-components
function PasswordForgotPage() {
    const [email, setEmail] = useState('');
    const [isEmailVerifiedForPasswordChange, setIsEmailVerifiedForPasswordChange] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                const response = await apiService.checkEmailVerificationStatus(email);
                if (response.isEmailVerifiedForPasswordChange) {
                    setIsEmailVerifiedForPasswordChange(true);
                    clearInterval(intervalId);
                }
            } catch (error) {
                console.error('Error while checking email verification:', error);
            }
        }, 5000); // Poll every 5 seconds, adjust as needed

        return () => clearInterval(intervalId); // Clean up interval
    }, [email, setIsEmailVerifiedForPasswordChange]);

    useEffect(() => {
        if (isEmailVerifiedForPasswordChange) {
            // Navigate to the password change screen
            navigate('/change-password', { state: { email: email } });
        }
    }, [email, isEmailVerifiedForPasswordChange, navigate]);



    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await apiService.post('/user/request-password-reset', { email });
            if (response.status === 200) {
                alert('Verification email sent. Please check your email.');
            } else {
                alert('Failed to send verification email.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error sending verification email.');
        }
    };

    const handleLogoClick = () => {
        navigate('/home');
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" onClick={handleLogoClick} className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-14 h-14 mr-2 rounded-full" src="https://campusconnectbucket.s3.eu-north-1.amazonaws.com/Logo_Campus_Connect_Circular-removebg-preview.png" alt="logo" />
                    Campus Connect
                </a>
                <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                    <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Reset Password
                    </h2>
                    <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@company.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-hover-text hover:bg-blue-text text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send Verification Email</button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default withBackButtonListener(PasswordForgotPage);
