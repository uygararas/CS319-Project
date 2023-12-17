import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar.jsx";
import ProductCard from "../components/ProductCard.jsx";
import apiService from '../services/apiService';
import SessionService from "../services/sessionService.js";
import {useNavigate} from "react-router-dom";
import Footer from "../components/Footer.jsx";

function OldPostsPage() {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('jwtToken');
        if (!token) {
            navigate('/');
        }
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
            <div className="px-20 py-10 bg-repeat" style={{
                backgroundImage: "url('https://campusconnectbucket.s3.eu-north-1.amazonaws.com/bg.jpg')",
                backgroundRepeat: 'repeat',
                backgroundAttachment: 'fixed'
            }}>
                <div className="grid grid-cols-4 gap-20 ">
                    {products.map(product => (
                        <ProductCard key={product.itemId} product={product} />
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default OldPostsPage;
