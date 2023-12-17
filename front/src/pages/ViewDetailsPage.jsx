import Navbar from "../components/Navbar.jsx";
import { useState, useEffect, useRef } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import apiService from '../services/apiService';
import SessionService from "../services/sessionService.js";
import Footer from "../components/Footer.jsx";

function ViewDetailsPage() {
    const { itemId } = useParams();
    const [email, setEmail] = useState("");
    const [product, setProduct] = useState({});
    const [privateMessage, setPrivateMessage] = useState('');
    const userId = SessionService.getUserId();
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [userEmails, setUserEmails] = useState('');


    // Replace 'ws://localhost:5173' with your actual WebSocket server URL.
    const webSocketUrl = 'ws://localhost:5173';
    const webSocket = useRef(new WebSocket(webSocketUrl));
    const navigate = useNavigate();
    

    
    useEffect(() => {
        const token = sessionStorage.getItem('jwtToken');
        if (!token) {
            navigate('/');
        }

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
        fetchComments();
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
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    }
    const fetchUserEmail = async () => {
        try {
            const res = await apiService.getEmailByUserId(product.userId);
            console.log(res);
            return res;
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }
    const fetchComments = async () => {
        try {
            const response = await apiService.get(`/comments/${itemId}`);
            const fetchedComments = response.data;

            // After fetching comments, fetch emails for each user in the comments
            let emails = {};
            for (const comment of fetchedComments) {
                if (!emails[comment.userId]) {
                    const emailResponse = await apiService.getEmailByUserId(comment.userId);
                    emails[comment.userId] = emailResponse.split('@')[0];
                }
            }
            setComments(fetchedComments);
            setUserEmails(emails); // Update the state with fetched emails
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
                fetchComments(); // Refresh comments after posting

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
    const handleCommentDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this comment?')) {
            return;
        } try {
            // Replace with the correct endpoint URL and format as necessary
            const response = await apiService.delete(`/comments/delete/${id}`);
            console.log(response.status);
            if (response.status === 200) {
                alert('Comment deleted successfully');
                fetchComments();
                // Optionally, refresh comments or update state here
            } else {
                alert('Failed to delete comment');
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
            alert('Error occurred while deleting comment');
        }
    }
    // Function that uses the seller's email
    const handleEmailClick = async () => {
        try {
            const sellerEmail = await fetchUserEmail(); // Wait for the email
            const subject = encodeURIComponent("Inquiry About Your Product");
            const emailBody = encodeURIComponent("Hello, I'm interested in your product listed on Campus Connect...");
            window.location.href = `mailto:${sellerEmail}?subject=${subject}&body=${emailBody}`;
        } catch (error) {
            console.error('Error fetching seller email:', error);
        }
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
                                        {product.given ? 'Mark as Active' : 'Mark as Given'}
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
                                    <button onClick={() => handleEmailClick(fetchUserEmail())} className="mt-5 px-4 py-2 bg-[#4CAF50] text-white rounded hover:bg-green-600 transition-colors">Click and e-mail to owner</button>
                                )}
                            </div>
                            <div className="mt-5 relative w-full overflow-y-scroll bg-white rounded-md dark:bg-gray-700 dark:border-gray-600 h-96">
                                <ul>
                                    <li>
                                        {comments.map((comment, index) => (
                                            <a key={index} className="flex w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                                                <img className="me-3 rounded-full w-11 h-11" src="https://campusconnectbucket.s3.eu-north-1.amazonaws.com/Logo_Campus_Connect_Circular-removebg-preview.png" alt="Jese Leos Avatar"></img>
                                                <div>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">New comment from <span className="font-medium text-gray-900 dark:text-white">{userEmails[comment.userId] || 'Loading username...'}</span>: {comment.text}</p>
                                                    <span className="text-xs text-blue-600 dark:text-blue-500">{formatTimestamp(comment.createdAt)}   {((product.userId === userId) || (comment.userId === userId)) && (
                                                        <button onClick={() => handleCommentDelete(comment.id)} className="text-xs text-black hover:underline">Delete</button>
                                                    )}</span>
                                                </div>
                                            </a>
                                        ))}
                                    </li>
                                </ul>
                                <div className="sticky bottom-0 left-0 z-50 bg-white">
                                    <div>
                                        <form>
                                            <div className="mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                                <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                                    <label htmlFor="comment" className="sr-only">Your comment</label>
                                                    <textarea id="comment" value={newComment} rows="1" onChange={handleCommentChange}className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required></textarea>
                                                </div>
                                                <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                                    <button type="button" onClick={postComment} className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                                        Post comment
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                        <p className="ms-auto text-xs text-gray-500 dark:text-gray-400">Remember, comments to this post should follow our <a href="/community-guidelines" className="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</a>
                                            .</p>
                                    </div>
                                </div>
                            </div>
                        </div>
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