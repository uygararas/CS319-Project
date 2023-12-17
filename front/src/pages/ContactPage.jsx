import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
//this is the contact page which is also an informative class includes our applications functional email
//this email is also the email that is being used by our emailservice method
function ContactPage() {
    return (
        <div className="body">
            <Navbar />
            <div className="container h-screen">
                <h2 className="categoryHeader">Contact Us</h2>
                <p className="productCardExplanation">
                    {/* Add your contact information here */}
                    For inquiries, please contact us at: campusconnectbilkent@gmail.com
                </p>
            </div>
            <Footer />
        </div>
    );
}

export default ContactPage;
