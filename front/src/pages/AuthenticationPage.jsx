// AuthenticationPage.js
import { useState } from 'react';
import apiService from '../services/apiService';
import {useNavigate} from "react-router-dom";

//this is the authentication page which is actually the login screen
//in this screen what we do is communicating with the back so that
//unidentified users can not login
function AuthenticationPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            console.log('Starting login process...');
            const response = await apiService.post('/user/login', { email, password });
            console.log('Response from backend:', response);

            if (response.data.success) {
                sessionStorage.setItem('jwtToken', response.data.token);
                window.location.href = '/home';
            }
            else if(response.data.body === "Email not found" || response.data.body === "Invalid credentials"){
                alert("Invalid credentials");
            }
            else if(response.data.body === "Email not verified"){
                alert("Email not verified");
            }
        } catch (error) {
            console.error('Login error:', error);
            alert("Make sure you signed up and did verification or check your internet connection");
            setIsSubmitting(false);
        }
    };


    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
            <div className="flex justify-center items-center h-screen">
                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to Campus Connect</h5>
                            <h6 className="text-sm font-medium text-gray-900 dark:text-white">A Bilkent only e-commerce network!</h6>
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-72">Your Bilkent email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                placeholder="name.surname@label.bilkent.edu.tr"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Campus Connect password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <a href="/password-forgot-page" className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isSubmitting ? 'Logging in...' : 'Login to your account'}</button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered? <a href="/sign-up" className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AuthenticationPage;
