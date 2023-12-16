import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import withBackButtonListener from "../components/withBackButtonListener.jsx";
import SessionService from "../services/sessionService.js";

class ChatPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            newMessage: ''
        };
    }

    componentDidMount() {
        this.fetchMessages();
    }

    fetchMessages = () => {
        const chatSessionId = this.props.params.chatSessionId; // Update as per your route param
        fetch(`/api/messages/${chatSessionId}`)
            .then(response => response.json())
            .then(data => this.setState({ messages: data }))
            .catch(error => console.error('Error fetching messages:', error));
    };

    sendMessage = () => {
        const { newMessage } = this.state;
        const chatSessionId = this.props.params.chatSessionId;

        const message = {
            content: newMessage,
            chatSessionId: chatSessionId, // Assuming this is how the backend identifies chat session
            senderId: SessionService.getUserId() // Fetch the current user's ID
        };

        fetch('/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(message)
        })
            .then(response => {
                if (response.ok) {
                    this.setState({ newMessage: '' });
                    this.fetchMessages(); // Fetch messages again to update the list
                } else {
                    console.error('Error sending message:', response);
                }
            })
            .catch(error => console.error('Error sending message:', error));
    };


    handleNewMessageChange = (event) => {
        this.setState({ newMessage: event.target.value });
    };

    render() {
        const { messages, newMessage } = this.state;

        return (
            <div className="chat-page">
                <Navbar />
                <div className="chat-container">
                    <h2>Chat with Seller</h2>
                    <div className="messages">
                        {messages.map((msg, index) => (
                            <div key={index} className="message">{msg.content}</div>
                        ))}
                    </div>
                    <div className="message-input">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={this.handleNewMessageChange}
                            placeholder="Type a message..."
                        />
                        <button onClick={this.sendMessage}>Send</button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

}

// Wrapper to use useParams in a class component
function ChatPageWithParams(props) {
    const params = useParams();
    return <ChatPage {...props} params={params} />;
}

export default withBackButtonListener(ChatPageWithParams);
