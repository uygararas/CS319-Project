import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import withBackButtonListener from "../components/withBackButtonListener.jsx";
// Include other necessary imports

class ChatPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            newMessage: ''
        };
        this.webSocket = null;
    }

    componentDidMount() {
        const { sellerId } = this.props.params; // Accessing sellerId from params
        // Replace with your WebSocket server URL and include sellerId if needed
        this.webSocket = new WebSocket('ws://localhost:8080/chat/' + sellerId);

        this.webSocket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            this.setState(prevState => ({
                messages: [...prevState.messages, message]
            }));
        };

        this.webSocket.onopen = () => {
            console.log('WebSocket connection opened');
            // You can send an initial message or perform any setup here
        };

        this.webSocket.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };
    }

    componentWillUnmount() {
        if (this.webSocket) {
            this.webSocket.close();
        }
    }

    sendMessage = () => {
        const { newMessage } = this.state;
        if (this.webSocket.readyState === WebSocket.OPEN && newMessage) {
            this.webSocket.send(JSON.stringify({ message: newMessage }));
            this.setState({ newMessage: '' });
        }
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

// withRouter is not required in React Router v6
// Use a wrapper component or function to pass useParams to a class component
function ChatPageWithParams(props) {
    const params = useParams();
    return <ChatPage {...props} params={params} />;
}

export default withBackButtonListener(ChatPageWithParams);
