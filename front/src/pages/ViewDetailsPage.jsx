import Navbar from "../components/Navbar.jsx";
import { useState, useEffect, useRef } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import apiService from '../services/apiService';
import SessionService from "../services/sessionService.js";

function ViewDetailsPage() {
    const { itemId } = useParams();
    const [product, setProduct] = useState({});
    const [privateMessage, setPrivateMessage] = useState('');
    const userId = SessionService.getUserId();
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');

    // Replace 'ws://localhost:5173' with your actual WebSocket server URL.
    const webSocketUrl = 'ws://localhost:5173';
    const webSocket = useRef(new WebSocket(webSocketUrl));
    const navigate = useNavigate();
    useEffect(() => {
        const token = sessionStorage.getItem('jwtToken');
        if (!token) {
            navigate('/');
        }
        // Listen for messages
        webSocket.current.addEventListener('message', (event) => {
            // Handle incoming messages
            const message = JSON.parse(event.data);
            console.log('Received message:', message);
            // Update messages state
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Clean up WebSocket on component unmount
        return () => {
            webSocket.current.close();
        };
    }, []);

    useEffect(() => {
        // Open WebSocket connection after component mounts
        webSocket.current.addEventListener('open', () => {
            console.log('WebSocket connection opened');
        });
    }, []);  // Empty dependency array to ensure it runs only once after initial render

    // Function to send a private message
    const sendPrivateMessage = () => {
        const privateMessage = {
            type: 'private-message',
            content: messageText,
            // Add any other necessary data
        };

        // Check if the WebSocket is open before sending a message
        if (webSocket.current.readyState === WebSocket.OPEN) {
            // Send the private message
            webSocket.current.send(JSON.stringify(privateMessage));

            // Clear the input field
            setMessageText('');
        } else {
            console.error('WebSocket not open. Unable to send message.');
        }
    };

    const getProduct = async () => {
        try {
            const response = await apiService.get(`/items/${itemId}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    const changeIsGiven = async () => {
        try {
            const response = await apiService.put(`/${itemId}/toggle-given`);
            if (response.status === 200 || response.status === 201) {
                console.log('Product status is changed successfully!', response.data);
                alert("Product status is changed successfully!");
            }
        } catch (error) {
            console.error('Error changing product status:', error);
        }
    };

    const handlePrivateMessageChange = (event) => {
        setPrivateMessage(event.target.value);
    };

    useEffect(() => {
        getProduct();
    }, [itemId]);

    const renderPrice = () => {
        if (product.category === 'lendItem' || product.category === 'rentedItem') {
            return <h3 className="text-4xl my-4">Price: {product.price}</h3>;
        }
        return null;
    };

    const renderDuration = () => {
        if (product.category === 'lendItem' || product.category === 'rentedItem') {
            return <h3 className="text-4xl my-4">Item is planned to be given away for at most: {product.duration}</h3>;
        }
        return null;
    };

    const renderCondition = () => {
        if (product.category === 'lendItem' || product.category === 'rentedItem' || product.category === 'secondHandItem' || product.category === 'donatedItem') {
            return <h3 className="text-4xl my-4">Condition of the Item: {product.condition}</h3>;
        }
        return null;
    };

    const renderLocation = () => {
        if (product.category === 'foundItem' || product.category === 'lostItem') {
            let ForL = '';

            if (product.category === 'foundItem') {
                ForL = 'Found';
            } else if (product.category === 'lostItem') {
                ForL = 'Lost';
            }
            return <h3 className="text-4xl my-4">Location {ForL}: {product.location}</h3>;
        }
        return null;
    };

    const renderDateLost = () => {
        if (product.category === 'foundItem' || product.category === 'lostItem') {
            let ForL = '';

            if (product.category === 'foundItem') {
                ForL = 'Found';
            } else if (product.category === 'lostItem') {
                ForL = 'Lost';
            }
            return <h3 className="text-4xl my-4">Date and Time {ForL}: {product.dateLost}</h3>;
        }
        return null;
    };

    function formatItemType(type) {
        switch (type) {
            case 'secondHandItem':
                return 'Second Hand Item';
            case 'donatedItem':
                return 'Donated Item';
            case 'lostItem':
                return 'Lost Item';
            case 'foundItem':
                return 'Found Item';
            case 'lendItem':
                return 'Lend Item';
            case 'rentedItem':
                return 'Rented Item';
            default:
                return 'Unknown Type';
        }
    }

    const itemTypeFormatted = formatItemType(product.category);

    return (
        <div>
            <Navbar />
            <div className="container mx-auto my-5 py-2">
                <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2 text-center p-3">
                        <img className="mx-auto" src={product.imageUrl} alt="" style={{ width: '300px', height: '300px' }} />
                    </div>
                    <div className="w-full md:w-1/2 p-5">
                        <h4 className="text-uppercase text-gray-600">{itemTypeFormatted}</h4>
                        <h1 className="text-5xl">{product.title}</h1>

                        <p className="text-lg">{product.description}</p>
                        <div className="form-group">
                            <label htmlFor="private-message">Private Message</label>
                            <input
                                type="text"
                                id="private-message"
                                className="form-control"
                                placeholder="Hello, I am interested!"
                                value={privateMessage}
                                onChange={handlePrivateMessageChange}
                            />
                        </div>
                        <div>
                            <button className="btn btn-default" type="button" onClick={sendPrivateMessage}>
                                Send Private Message
                            </button>
                        </div>

                        <button className="btn btn-outline-dark addToCart">Communicate with seller?</button>
                        {renderPrice()}
                        {renderCondition()}
                        {renderDuration()}
                        {renderLocation()}
                        {renderDateLost()}
                        {product.userId === userId && (
                            <button onClick={changeIsGiven}>
                                Change Activeness
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewDetailsPage;
