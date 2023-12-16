import Navbar from "../components/Navbar.jsx";
import ProductCard from "../components/ProductCard.jsx";
import Footer from "../components/Footer.jsx";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import apiService from "../services/apiService.js";

// eslint-disable-next-line react/prop-types
function SearchResultsPage () {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const query = searchParams.get('q');
            if (query) {
                try {
                    const response = await apiService.get(`/items/search?q=${query}`);
                    setProducts(response.data);
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            }
        };
        fetchProducts();
    }, [searchParams]);
    return(
        <div>
            <Navbar />
            <div className="px-20 py-10 bg-repeat" style={{
                backgroundImage: "url('/bg.jpg')",
                backgroundRepeat: 'repeat',
                backgroundAttachment: 'fixed'
            }}>
                <div className="grid grid-cols-4 gap-20 ">
                    {/* eslint-disable-next-line react/prop-types */}
                    {products.map(product => (
                        <ProductCard key={product.itemId} product={product} />
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    );
}
export default SearchResultsPage;