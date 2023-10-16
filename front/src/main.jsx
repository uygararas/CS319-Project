import React from 'react'
import ReactDOM from 'react-dom';
import './index.css'
import Navbar from "./components/navbar.jsx";
import 'flowbite';
import Sidebar from "./components/sidebar.jsx";
import Homepage from "./pages/homepage.jsx";

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
    <React.StrictMode>
        <Homepage />
    </React.StrictMode>,
    document.getElementById('root')
);
