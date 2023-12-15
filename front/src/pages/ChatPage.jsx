import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import withBackButtonListener from "../components/withBackButtonListener.jsx";

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
        fetch('/api/messages')
            .then(response => response.json())
            .then(data => this.setState({ messages: data }))
            .catch(error => console.error('Error fetching messages:', error));
    };

    sendMessage = () => {
        const { newMessage } = this.state;
        const { sellerId } = this.props.params;  // Or your logic to determine recipient
        const message = {
            content: newMessage,
            recipientId: sellerId,  // Assuming you have recipient's ID
            senderId: 'currentUserId' // Replace with actual sender's ID
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
