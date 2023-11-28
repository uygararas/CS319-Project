import Navbar from "../components/Navbar.jsx";
import ProductCard from "../components/ProductCard.jsx";
import {useState, useEffect} from "react";

// eslint-disable-next-line react/prop-types
function PreviewProductsPages({categoryName}) {
    const [products, setProducts] = useState([])
    const getProducts = async () => {
        const res = await fetch(
            `http://localhost:8080/items?category=${categoryName}`, {
                method: 'GET',
            }
        );
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const json = await res.json();
        setProducts(json);
    }

    useEffect(() => {
        getProducts();
    }, []);

    return(
        <div>
            <Navbar />
            <div className="px-20 py-10 bg-gradient-to-b from-white to-gray-300">
                {/* eslint-disable-next-line react/prop-types */}
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