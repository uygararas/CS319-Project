import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar.jsx";
import { useParams } from 'react-router-dom';
//import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import Footer from "../components/Footer.jsx";

function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const { chatId } = useParams(); // Get chatId from route parameter
    let stompClient = null;

    useEffect(() => {
        // Establish WebSocket connection
        const socket = new SockJS('http://localhost:8080/our-websocket'); // Your server URL
        stompClient = Stomp.over(socket);

        stompClient.connect({}, frame => {
            console.log('Connected: ' + frame);

            stompClient.subscribe('/topic/messages', message => {
                // Handle received messages
                const receivedMessage = JSON.parse(message.body).contents;
                setMessages(prevMessages => [...prevMessages, receivedMessage]);
            });
        });

        return () => {
            // Disconnect on cleanup
            if (stompClient !== null) {
                stompClient.disconnect();
            }
            console.log("Disconnected");
        };
    }, [chatId]);

    const sendMessage = () => {
        if (stompClient) {
            const messageToSend = JSON.stringify({messageContents: newMessage});
            stompClient.send("/ws/message", {}, messageToSend);
            setNewMessage("");
        }
    };

    return (
        <div className="chat-page">
            <Navbar />
            <div className="chat-container">
                <div className="chat-header">Chat</div>
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div key={index}>{msg}</div>
                    ))}
                </div>
                <div className="chat-input">
                    <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ChatPage;
