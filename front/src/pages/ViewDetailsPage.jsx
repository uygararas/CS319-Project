import Navbar from "../components/Navbar.jsx";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
function ViewDetailsPage() {
    const [item, setItem] = useState(null);
    const { itemId } = useParams();
    /*useEffect(() => {
        fetch(`https://endpoint/items/${itemId}`)
            .then(response => response.json())
            .then(data => setItem(data))
            .catch(error => console.error('Error:', error));
    }, [itemId]);
    if (!item) {
        return <div>Loading...</div>;
    }*/
    const renderPrice = () => {
        if (item.category === 'Second Hands' || item.category === '') {
            return <h3 className="text-4xl my-4">Price: {item.price}</h3>;
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
                        <h4 className="text-uppercase text-gray-600">Category Here</h4>
                        <h1 className="text-5xl">Title Here</h1>

                        <p className="text-lg">Description Here</p>
                        <button className="btn btn-outline-dark addToCart">Communicate with seller?</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewDetailsPage;
