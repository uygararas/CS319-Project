import React, { useState } from 'react';
import axios from 'axios';

function AuthenticationPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // For testing purposes, bypass the login logic
        // and redirect to the home page directly:
        window.location.href = '/home';

        // Comment out the real login logic during testing
        /*
        try {
            const response = await axios.post('http://localhost:8080/user/login', { email, password });
            // Assuming the backend returns a successful response for valid credentials
            if (response.data.success) {
                // Redirect to the home page or handle successful login
                window.location.href = '/home';
            } else {
                // Handle invalid credentials
                alert('Invalid email or password');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login error');
        }
        */
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
                            <a href="/change-password" className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
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
