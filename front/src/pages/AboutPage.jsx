import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AboutPage() {
    return (
        <div className="body">
            <Navbar />
            <div className="container content-wrapper about-page">
                <h2 className="categoryHeader">About Us</h2>
                <div className="about-content">
                    <p className="about-intro">
                        <strong>Welcome to Campus Connect – Your Campus Life Simplified!</strong>
                    </p>

                    <p className="about-paragraph">
                        Campus Connect is dedicated to enhancing the day-to-day experiences of students, faculty, and staff at our educational institution. We understand the unique challenges and opportunities of campus life and aim to provide practical, user-friendly solutions to make your campus experience more connected and convenient.
                    </p>

                    <h3 className="about-subheader">What We Offer</h3>
                    <p className="about-paragraph">
                        <strong>Marketplace:</strong> Our vibrant marketplace is the heart of Campus Connect. Here, members can buy, sell, or donate a variety of items, including textbooks, electronics, and more. It's a safe and easy way for you to find what you need right on campus.
                    </p>
                    <p className="about-paragraph">
                        <strong>Lost and Found:</strong> Misplaced something on campus? Our lost and found feature helps you find your lost items by connecting you with others who may have found them. It’s community support at its best.
                    </p>

                    <h3 className="about-subheader">Our Vision</h3>
                    <p className="about-paragraph">
                        Our vision at Campus Connect is to provide a seamless and integrated platform that addresses the everyday needs of our campus community. We believe that a well-connected campus can significantly enhance the academic and social environment for everyone.
                    </p>

                    <h3 className="about-subheader">Our Commitment to Safety and Respect</h3>
                    <p className="about-paragraph">
                        At Campus Connect, we prioritize the safety and well-being of our community. We adhere to strict standards to ensure our platform remains a respectful and secure place for all users. We respect your privacy and are committed to protecting it.
                    </p>

                    <h3 className="about-subheader">Be Part of Campus Connect</h3>
                    <p className="about-paragraph">
                        Campus Connect invites students, faculty, and staff to join our platform. Whether you're looking to buy essential items, sell things you no longer need, or find lost belongings, Campus Connect is here to assist. Join us in building a more connected and resourceful campus community!
                    </p>

                    <p className="about-feedback">
                        Your feedback is invaluable to us. If you have suggestions or ideas on how we can improve, we'd love to hear from you. Together, we can make Campus Connect even better!
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AboutPage;
