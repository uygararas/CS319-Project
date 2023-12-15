import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    let webSocket = null;

    useEffect(() => {
        // Replace with your actual WebSocket URL
        webSocket = new WebSocket('ws://localhost:8080/our-websocket');

        webSocket.onmessage = function(event) {
            // Assuming the server sends a stringified JSON object
            const data = JSON.parse(event.data);
            setMessages(prevMessages => [...prevMessages, data.messageContents]);
        };

        webSocket.onerror = function(error) {
            console.error('WebSocket Error: ', error);
        };

        webSocket.onclose = function() {
            console.log('WebSocket connection closed');
        };

        return () => {
            if (webSocket) {
                webSocket.close();
            }
        };
    }, []);

    const sendMessage = () => {
        if (webSocket && webSocket.readyState === WebSocket.OPEN && newMessage) {
            const messageToSend = JSON.stringify({ messageContents: newMessage });
            webSocket.send(messageToSend);
            setNewMessage("");
        }
    };

    return (
        <div>
            <Navbar />
            <div>
                <div>Chat</div>
                <div>
                    {messages.map((msg, index) => (
                        <div key={index}>{msg}</div>
                    ))}
                </div>
                <div>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ChatPage;
