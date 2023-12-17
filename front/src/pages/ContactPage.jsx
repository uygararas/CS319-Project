import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ContactPage() {
    return (
        <div className="body">
            <Navbar />
            <div className="container">
                <h2 className="categoryHeader">Contact Us</h2>
                <p className="productCardExplanation">
                    {/* Add your contact information here */}
                    For inquiries, please contact us at...
                </p>
            </div>
            <Footer />
        </div>
    );
}

export default ContactPage;