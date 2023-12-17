import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function CommunityGuidelinesPage() {
    return (
        <div className="body">
            <Navbar />
            <div className="container mx-auto my-5 py-2 h-screen">
                <h2 className="text-3xl font-bold my-4">Community Guidelines</h2>
                <div className="guidelines-content">
                    <p className="mb-4">Our community is a place for engaging, respectful, and constructive interactions. To maintain a positive environment, we ask all members to adhere to the following guidelines:</p>
                    <ul className="list-disc list-inside">
                        <li>Be respectful and courteous to others at all times.</li>
                        <li>Avoid posting offensive or inappropriate content.</li>
                        <li>Do not engage in harassment, bullying, or any form of intimidation.</li>
                        <li>Respect others' privacy and confidentiality.</li>
                        <li>Use the platform for its intended purposes and adhere to all applicable laws and regulations.</li>
                        <li>Report any content or behavior that violates these guidelines.</li>
                    </ul>
                    <p className="mt-4">By following these guidelines, we can ensure a welcoming and supportive community for everyone. Thank you for your cooperation!</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CommunityGuidelinesPage;
