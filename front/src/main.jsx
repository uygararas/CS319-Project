import React from 'react'
import ReactDOM from 'react-dom';
import './index.css'
import 'flowbite';
import Router from "./router.jsx";

// eslint-disable-next-line react/no-deprecated
ReactDOM.render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>,
    document.getElementById('root')
);
