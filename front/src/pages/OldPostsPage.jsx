import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar.jsx";
import ProductCard from "../components/ProductCard.jsx";
import apiService from '../services/apiService';
import SessionService from "../services/sessionService.js";

function ActivePostsPage() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const userId = SessionService.getUserId()
            const response = await apiService.get(`/items/old-posts/${userId}`);
            setProducts(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }

    };

    return (
        <div>
            <Navbar />
            <div className="px-20 py-10 bg-gradient-to-b from-white to-gray-300 h-screen">
                <div className="grid grid-cols-4 gap-20 ">
                    {products.map(product => (
                        <ProductCard key={product.itemId} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ActivePostsPage;
