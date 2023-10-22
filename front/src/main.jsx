import React from 'react'
import ReactDOM from 'react-dom';
import './index.css'
import Navbar from "./components/navbar.jsx";
import 'flowbite';
import Sidebar from "./components/sidebar.jsx";
import Homepage from "./pages/homepage.jsx";
import LoginCard from "./components/loginCard.jsx";
import LoginPage from "./pages/loginPage.jsx";
import SignUpForm from "./pages/signUpForm.jsx";
import ChangePassword from "./pages/changePassword.jsx";
import PostItem from "./pages/postItem.jsx";
import Router from "./router.jsx";

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>,
    document.getElementById('root')
);
