//password change page is used for basic in-app password changes this is used for
//changing the password without entering the email
import { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import {useLocation, useNavigate} from 'react-router-dom';
import withBackButtonListener from '../components/withBackButtonListener.jsx';
import SessionService from '../services/SessionService'; // Import SessionService

function PasswordChangePage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const emailGot = location.state?.email;

    useEffect(() => {
        const fetchEmail = async () => {
            const userEmail = await SessionService.getUserEmail();
            if (userEmail) {
                setEmail(userEmail);
            }
            else if(emailGot){
                setEmail(emailGot);
            }
        };

        fetchEmail();
    }, [emailGot]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await apiService.post('/user/change-password', {
                email,
                newPassword: password
            });
            console.log(response);
            if (response.status === 200) {
                alert('Password changed successfully');
                navigate('/');
            } else {
                alert('Password change failed');
            }
        } catch (error) {
            console.error('Password change error:', error);
            alert('Error changing password');
        }
    };

    return(
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="/home" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-14 h-14 mr-2 rounded-full" src="https://campusconnectbucket.s3.eu-north-1.amazonaws.com/Logo_Campus_Connect_Circular-removebg-preview.png" alt="logo" />
                    Campus Connect
                </a>
                <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                    <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Change Password
                    </h2>
                    <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleSubmit}>
                        {/* Removed the email input field */}
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                            <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Change password</button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default withBackButtonListener(PasswordChangePage);
