import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar.jsx";
import ProductCard from "../components/ProductCard.jsx";
import apiService from '../services/apiService';
import {useNavigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
function PreviewProductsPages({ categoryName }) {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const token = sessionStorage.getItem('jwtToken');
        if (!token) {
            navigate('/');
        }
        getProducts();
    }, []); // Add categoryName to dependency array to refetch when it changes

    const getProducts = async () => {
        try {
            const response = await apiService.get(`/items?category=${categoryName}`);
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

export default PreviewProductsPages;
