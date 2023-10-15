import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Test from "./test.jsx";
import Navbar from "./components/navbar.jsx";
import '../flowbite.min.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar />
  </React.StrictMode>,
)
