import React, {useState, useEffect, useRef} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import apiService from '../services/apiService';
import SessionService from "../services/sessionService.js";

function ViewDetailsPage() {
    const { itemId } = useParams();
    const [product, setProduct] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const userId = SessionService.getUserId();
    const navigate = useNavigate();
    const webSocketUrl = 'ws://localhost:8080/our-websocket';
    const webSocket = useRef(new WebSocket(webSocketUrl));

    useEffect(() => {
        getProduct();
        fetchComments();
        webSocket.current.addEventListener('open', () => {
            console.log('WebSocket connection opened');
        });

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
    }, [itemId]);

    const getProduct = async () => {
        try {
            const response = await apiService.get(`/items/${itemId}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

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


    const fetchComments = async () => {
        try {
            const response = await apiService.get(`/api/comments/${itemId}`);
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const postComment = async () => {
        const commentData = { text: newComment, productId: itemId };
        try {
            await apiService.post('/api/comments', commentData);
            setNewComment('');
            fetchComments();
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const navigateToChat = () => {
        const sellerId = product.itemID;
        navigate(`/chat/${sellerId}`);
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
        // Update the product state
        setProduct(prevState => ({
            ...prevState,
            given: !prevState.given
        }));
    };

    const handlePrivateMessageChange = (event) => {
        setPrivateMessage(event.target.value);
    };


    const renderPrice = () => {
        if (product.category === 'secondHandItem' || product.category === 'rentedItem') {
            return <h3 className="text-xl md:text-2xl font-semibold my-2">Price: <span className="font-normal">{product.price} TRY</span></h3>;
        }
        return null;
    };

    const renderDuration = () => {
        if (product.category === 'lendItem' || product.category === 'rentedItem') {
            return <h3 className="text-xl md:text-2xl font-semibold my-2">Duration: <span className="font-normal">{product.duration}</span></h3>;
        }
        return null;
    };

    const renderCondition = () => {
        if (product.category === 'lendItem' || product.category === 'rentedItem' || product.category === 'secondHandItem' || product.category === 'donatedItem') {
            return <h3 className="text-xl md:text-2xl font-semibold my-2">Condition: <span className="font-normal">{product.condition}</span></h3>;
        }
        return null;
    };

    const renderLocation = () => {
        if (product.category === 'foundItem' || product.category === 'lostItem') {
            const ForL = product.category === 'foundItem' ? 'Found' : 'Lost';
            return <h3 className="text-xl md:text-2xl font-semibold my-2">Location {ForL}: <span className="font-normal">{product.location}</span></h3>;
        }
        return null;
    };

    const renderDateLost = () => {
        if (product.category === 'foundItem' || product.category === 'lostItem') {
            const ForL = product.category === 'foundItem' ? 'Found' : 'Lost';
            return <h3 className="text-xl md:text-2xl font-semibold my-2">Date and Time {ForL}: <span className="font-normal">{product.dateLost}</span></h3>;
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
            <div className="container mx-auto my-5 py-2 body">
                <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2 p-3 flex justify-center">
                        <img
                            className="max-w-[600px] max-h-[600px] min-w-[400px] min-h-[400px] object-contain"
                            src={product.imageUrl}
                            alt={product.name}
                        />
                    </div>
                    <div className="w-full md:w-1/2 p-5">
                        <h4 className="text-lg uppercase text-gray-600 mb-2">{itemTypeFormatted}</h4>
                        <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
                        <p className="text-lg break-words mb-4">
                            {product.description}
                        </p>
                        {renderPrice()}
                        {renderCondition()}
                        {renderDuration()}
                        {renderLocation()}
                        {renderDateLost()}
                        {product.userId === userId && (
                            <button onClick={changeIsGiven} className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                                {product.given ? 'Mark as Active' : 'Mark as Old'}
                            </button>
                        )}
                        {product.userId !== userId && (
                            <button onClick={navigateToChat} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-600 transition-colors">
                                Communicate with seller?
                            </button>
                        )}
                        <div className="comments-section fixed bottom-0 right-0 mr-4 mb-20 bg-white shadow-lg rounded-lg p-4 max-w-sm">
                            <h2 className="chat-title">Comments</h2>
                            <div className="comments-list overflow-y-auto max-h-96">
                                {comments.map((comment, index) => (
                                    <div key={index} className="comment mb-2 last:mb-0 p-2 bg-gray-100 rounded">
                                        <p>{comment.text}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="add-comment mt-4">
                                        <textarea
                                            className="w-full p-2 mb-2 border border-gray-300 rounded"
                                            value={newComment}
                                            onChange={handleCommentChange}
                                            placeholder="Add a comment..."
                                        />
                                <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        onClick={postComment}>Post Comment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ViewDetailsPage;