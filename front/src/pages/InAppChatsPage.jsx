import React, { Component } from 'react';
import withBackButtonListener from "../components/withBackButtonListener.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import {Link} from "react-router-dom";

class InAppChatsPage extends Component {
    state = {
        chats: [
            { id: 1, user: 'User1', message: 'Hello, how are you?' },
            { id: 2, user: 'User2', message: 'Did you see my last message?' },
            { id: 3, user: 'User3', message: 'Let’s meet tomorrow!' }
        ]
    };

    renderChatList() {
        return this.state.chats.map(chat => (
            <li key={chat.id} className="chat-item">
                <a href={`/chat/${chat.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="chat-user">{chat.user}</div>
                    <div className="chat-message">{chat.message}</div>
                </a>
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

