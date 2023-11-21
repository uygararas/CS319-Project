import ItemCard from "./itemCard.jsx";
import { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
function CategoryPageMiddle({categoryName}) {
    const [items, setItems] = useState([]);
    useEffect(() => {
        // Fetch items based on categoryName
        fetch(`https://your-backend-endpoint.com/items?category=${encodeURIComponent(categoryName)}`)
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error:', error));
    }, [categoryName]);
    return(
        <div className="px-20 py-10 bg-gradient-to-b from-white to-gray-300">
            {/* eslint-disable-next-line react/prop-types */}
            <div className="grid grid-cols-4 gap-20 ">
                {items.map(item => <ItemCard key={item.id} item={item} />)}
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
            </div>
        </div>
    );
}
export default CategoryPageMiddle;