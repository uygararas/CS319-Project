import Navbar from "../components/Navbar.jsx";
import { useState, useEffect, useRef } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import apiService from '../services/apiService';
import SessionService from "../services/sessionService.js";
import Footer from "../components/Footer.jsx";

function ViewDetailsPage() {
    const { itemId } = useParams();
    const [product, setProduct] = useState({});
    const [privateMessage, setPrivateMessage] = useState('');
    const userId = SessionService.getUserId();
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');


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
        // Update the product state
        setProduct(prevState => ({
            ...prevState,
            given: !prevState.given
        }));
    };

    const handlePrivateMessageChange = (event) => {
        setPrivateMessage(event.target.value);
    };

    useEffect(() => {
        getProduct();
    }, [itemId]);

    const navigateToChat = () => {
        const sellerId = product.userId; // Get the seller's userId from the product
        if (sellerId) {
            navigate(`/chat/${sellerId}`);
        } else {
            console.error('Seller ID not found');
        }
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

    const fetchComments = async () => {
        try {
            const response = await apiService.get(`/api/comments/${itemId}`);
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };
    const postComment = async () => {
        // Assuming you have functions to get the current user's ID
        const userId = SessionService.getUserId();

        const commentData = { text: newComment };

        try {
            // Construct the URL with itemId and userId as path parameters
            const url = `/post/${itemId}/${userId}`;

            const response = await apiService.post(url, commentData);

            if (response.status === 200 || response.status === 201) {
                setNewComment(''); // Clear the comment box
            } else {
                console.error('Error posting comment:', response);
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };



    const itemTypeFormatted = formatItemType(product.category);
    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };
    return (
        <div>
            <Navbar />
            <div className="container mx-auto my-5 py-2 body">
                <div className="flex flex-wrap md:flex-nowrap">

                    {/* Item Photo */}
                    <div className="item-photo w-full md:w-1/2 p-3">
                        <img
                            className="max-w-full h-auto object-contain"
                            src={product.imageUrl}
                            alt={product.name}
                        />
                    </div>

                    {/* Item Properties */}
                    <div className="item-properties w-full md:w-1/2 p-5">
                        <h4 className="text-lg uppercase text-gray-600 mb-2">{itemTypeFormatted}</h4>
                        <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
                        <p className="text-lg break-words mb-4">{product.description}</p>
                        {renderPrice()}
                        {renderCondition()}
                        {renderDuration()}
                        {renderLocation()}
                        {renderDateLost()}
                        <div className="grid grid-rows-2">
                            <div className="flex row-1">
                                {product.userId === userId && (
                                    <button onClick={changeIsGiven} className="mt-4 px-4 py-2 bg-[#4CAF50] text-white rounded hover:bg-green-600 transition-colors">
                                        {product.given ? 'Mark as Active' : 'Mark as Old'}
                                    </button>
                                )}
                            </div>
                            <div className="flex row-2">
                                {product.userId === userId && (
                                    <a href={`/update-product/${itemId}`} className="mt-4 px-4 py-2 bg-[#4CAF50] text-white rounded hover:bg-green-600 transition-colors">
                                        Update Product
                                    </a>
                                )}
                            </div>
                            <div>
                                {product.userId !== userId && (
                                    <button onClick={navigateToChat} className="px-4 py-2 bg-[#4CAF50] text-white rounded hover:bg-green-600 transition-colors">Communicate with seller</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="comments-section mt-5">
                    <h2>Comments</h2>
                    {comments.map((comment, index) => (
                        <div key={index} className="comment">
                            <p>{comment.text}</p>
                        </div>
                    ))}
                    <div className="add-comment">
                        <textarea
                            value={newComment}
                            onChange={handleCommentChange}
                            placeholder="Add a comment..."
                        />
                        <button onClick={postComment}>Post Comment</button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default ViewDetailsPage;
{/*<div className="form-group">
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
                        </div>*/}