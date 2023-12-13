import React, { Component } from 'react';
import withBackButtonListener from "../components/withBackButtonListener.jsx";

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
                <div className="chat-user">{chat.user}</div>
                <div className="chat-message">{chat.message}</div>
            </li>
        ));
    }

    render() {
        return (
            <div className="in-app-chats">
                <h1>Chats</h1>
                <ul className="chat-list">
                    {this.renderChatList()}
                </ul>
            </div>
        );
    }
}

export default withBackButtonListener(InAppChatsPage);
