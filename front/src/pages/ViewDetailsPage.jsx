import Navbar from "../components/Navbar.jsx";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
function ViewDetailsPage() {
    const initialProduct = ({
                                type,
                                title,
                                description,
                                imageUrl,
                                condition,
                                location,
                                dateLost,
                                duration,
                                price
                            }) => {
        const baseProduct = {
            type,
            title,
            description,
            imageUrl
        };
        switch (type) {
            case 'donatedItem':
                return { ...baseProduct, condition };
            case 'lostItem':
                return { ...baseProduct, location, dateLost };
            case 'foundItem':
                return { ...baseProduct, location, dateLost };
            case 'lendItem':
                return { ...baseProduct, duration, condition };
            case 'rentedItem':
                return { ...baseProduct, condition, duration, price };
            case 'secondHandItem':
                return { ...baseProduct, condition, price };
            default:
                return baseProduct;
        }
    };

    const { itemId } = useParams();
    const [product, setProduct] = useState({});

    const getProduct = async () => {
        const res = await fetch(
            `http://localhost:8080/items/${itemId}`, {
                method: 'GET',
            }
        );
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const json = await res.json();
        console.log(json);

        setProduct(json);
    }

    useEffect(() => {
        console.log(itemId);
        getProduct();
    }, []);

    const renderPrice = () => {
        if (product.type === 'secondHandItem' || product.type === 'rentedItem') {
            return <h3 className="text-4xl my-4">Price: {product.price}</h3>;
        }
        return null;
    };
    const renderDuration = () => {
        if (product.type === 'lendItem' || product.type === 'rentedItem') {
            return <h3 className="text-4xl my-4">Item is planned to be given away for at most: {product.duration}</h3>;
        }
        return null;
    };

    const renderCondition = () => {
        if (product.type === 'lendItem' || product.type === 'rentedItem' || product.type === 'secondHandItem' || product.type === 'donatedItem') {
            return <h3 className="text-4xl my-4">Condition of the Item: {product.condition}</h3>;
        }
        return null;
    };

    const renderLocation = () => {
        if (product.type === 'foundItem' || product.type === 'lostItem') {
            let ForL = '';

            if (product.type === 'foundItem') {
                ForL = 'Found';
            } else if (product.type === 'lostItem') {
                ForL = 'Lost';
            }
            return <h3 className="text-4xl my-4">Location {ForL}: {product.location}</h3>;
        }
        return null;
    };

    const renderDateLost = () => {
        if (product.type === 'foundItem' || product.type === 'lostItem') {
            let ForL = '';

            if (product.type === 'foundItem') {
                ForL = 'Found';
            } else if (product.type === 'lostItem') {
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

    const itemTypeFormatted = formatItemType(product.type);

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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewDetailsPage;
