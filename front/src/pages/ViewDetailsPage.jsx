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

    const { productId } = useParams();
    const [product, setProduct] = useState(initialProduct)
    const getProducts = async () => {
        const res = await fetch(
            `http://localhost:8080/items/${productId}`, {
                method: 'GET',
            }
        );
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const json = await res.json();
        setProduct(json);
    }

    useEffect(() => {
        getProducts();
    }, []);

    const renderPrice = () => {
        if (product.type === 'secondHandItem' || product.type === 'rentedItem') {
            return <h3 className="text-4xl my-4">Price: {product.price}</h3>;
        }
        return null;
    };
    const renderDuration = () => {
        if (product.type === 'lendItem' || product.type === 'rentedItem') {
            return <h3 className="text-4xl my-4">Price: {product.duration}</h3>;
        }
        return null;
    };

    const renderCondition = () => {
        if (product.type === 'lendItem' || product.type === 'rentedItem' || product.type === 'secondHandItem' || product.type === 'donatedItem') {
            return <h3 className="text-4xl my-4">Price: {product.duration}</h3>;
        }
        return null;
    };

    const renderLocation = () => {
        if (product.type === 'foundItem' || product.type === 'lostItem') {
            return <h3 className="text-4xl my-4">Price: {product.duration}</h3>;
        }
        return null;
    };

    const renderDateLost = () => {
        if (product.type === 'foundItem' || product.type === 'lostItem') {
            return <h3 className="text-4xl my-4">Price: {product.duration}</h3>;
        }
        return null;
    };

    return (
        <div>
            <Navbar/>
            <div className="container mx-auto my-5 py-2">
                <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2 text-center p-3">
                        <img className="mx-auto" src="/Modified_Logo_Campus_Connect.png" alt="" style={{ width: '300px', height: '300px' }} />
                    </div>
                    <div className="w-full md:w-1/2 p-5">
                        <h4 className="text-uppercase text-gray-600">{product.type}</h4>
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
