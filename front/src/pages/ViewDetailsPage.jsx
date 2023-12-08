import Navbar from "../components/Navbar.jsx";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../services/apiService';
import SessionService from "../services/sessionService.js";
function ViewDetailsPage() {

    const { itemId } = useParams();
    const [product, setProduct] = useState({});
    const userId = SessionService.getUserId();

    const getProduct = async () => {
        try {
            const response = await apiService.get(`/items/${itemId}`);
            setProduct(response.data); // response.data is already a JavaScript object
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };
    const changeIsGiven = async () => {
        try {
            const response = await apiService.put(`/${itemId}/toggle-given`);
            if (response.status === 200 || response.status === 201) {
                console.log('Product status is changed succesfully!:', response.data);
                alert("Product status is changed succesfully!");
            }
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    }

    useEffect(() => {
        console.log(itemId);
        getProduct();
    }, []);

    const renderPrice = () => {
        if (product.category === 'secondHandItem' || product.category === 'rentedItem') {
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
            <Navbar/>
            <div className="container mx-auto my-5 py-2">
                <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2 text-center p-3">
                        <img className="mx-auto" src={product.imageUrl} alt="" style={{ width: '300px', height: '300px' }} />
                    </div>
                    <div className="w-full md:w-1/2 p-5">
                        <h4 className="text-uppercase text-gray-600">{itemTypeFormatted}</h4>
                        <h1 className="text-5xl">{product.title}</h1>

                        <p className="text-lg">{product.description}</p>
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
