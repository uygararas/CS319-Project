import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AboutPage() {
    return (
        <div className="body">
            <Navbar />
            <div className="container">
                <h2 className="categoryHeader">About Us</h2>
                <p className="productCardExplanation">
                    {/* Add your about text here */}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                </p>
            </div>
            <Footer />
        </div>
    );
}

export default AboutPage;
