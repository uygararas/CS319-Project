import Navbar from "../components/Navbar.jsx";
import ProductCard from "../components/ProductCard.jsx";
//import { useState, useEffect } from 'react';

function PreviewProductsPages() {
    //const [items, setItems] = useState([]);
    /*useEffect(() => {
        // Fetch items based on categoryName
        fetch(`https://your-backend-endpoint.com/items?category=${encodeURIComponent(categoryName)}`)
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error:', error));
    }, [categoryName]);*/
    return(
        <div>
            <Navbar />
            <div className="px-20 py-10 bg-gradient-to-b from-white to-gray-300">
                {/* eslint-disable-next-line react/prop-types */}
                <div className="grid grid-cols-4 gap-20 ">
                    {//items.map(item => <ProductCard key={item.id} item={item} />)}
                        <ProductCard />}
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>
        </div>
    );
}
export default PreviewProductsPages;