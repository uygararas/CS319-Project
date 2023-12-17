import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AboutPage() {
    return (
        <div className="body">
            <Navbar />
            <div className="container content-wrapper">
                <h2 className="categoryHeader">About Us</h2>
                <p className="productCardExplanation">
                    {/* Add your about text here */}
                    This is the CampusConnect application created by Bilkent Students. I LOVE YOU YAHYA ELNOUBY.
                </p>
            </div>
            <Footer />
        </div>
    );
}

export default AboutPage;
