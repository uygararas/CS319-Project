import React, { Component } from 'react';
import withBackButtonListener from "../components/withBackButtonListener.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import {Link} from "react-router-dom";

class InAppChatsPage extends Component {
    state = {
        chats: [] // Initialize as an empty array
    };

    componentDidMount() {
        this.fetchChatSessions();
    }

    fetchChatSessions = () => {
        // Fetch chat sessions from the backend
        fetch('/api/chats')
            .then(response => response.json())
            .then(data => this.setState({ chats: data }))
            .catch(error => console.error('Error fetching chat sessions:', error));
    };

    renderChatList() {
        return this.state.chats.map(chatSession => (
            <li key={chatSession.id} className="chat-item">
                <Link to={`/chat/${chatSession.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="chat-user">{/* Display chat participant(s) info */}</div>
                    <div className="chat-message">{/* Last message preview or similar */}</div>
                </Link>
            </li>
        ));
    }




    render() {
        return (
            <div className="in-app-chats-page">
                <Navbar />
                <div className="in-app-chats-container">
                    <h1 className="chat-title">My Chats</h1>
                    <ul className="chat-list">
                        {this.renderChatList()}
                    </ul>
                </div>
                <Footer />
            </div>
        );
    }
}

export default InAppChatsPage; // Temporarily remove withBackButtonListener for testing

