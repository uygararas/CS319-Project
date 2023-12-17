//this is the home-screen of our application and all of the items that ara currently active is
// being displayed on this screen
import Navbar from "../components/Navbar.jsx";
import ProductCard from "../components/ProductCard.jsx";
import {useEffect, useRef, useState} from "react";
import apiService from '../services/apiService';
import withBackButtonListener from "../components/withBackButtonListener.jsx";
import Footer from "../components/Footer.jsx";
import SessionService from "../services/sessionService.js";

function MainPage() {
    const [products, setProducts] = useState([]);
    /*const initialProduct = ({
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
            case 'foundItem':
                return { ...baseProduct, location, dateLost };
            case 'lendItem':
                return { ...baseProduct, duration, condition };
            case 'rentedItem':
            case 'secondHandItem':
                return { ...baseProduct, condition, duration, price };
            default:
                return baseProduct;
        }
    };*/

    const userId = SessionService.getUserId();

    useEffect(() => {
        getProducts();
    }, []);
    const getProducts = async () => {
        try {
            const response = await apiService.get(`/items/get/${userId}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const targetRef = useRef(null);

    const scrollToTarget = () => {
        targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    return(
        <div>
            <Navbar />
            <div>
                <section className="h-screen bg-center bg-no-repeat bg-[url('https://campusconnectbucket.s3.eu-north-1.amazonaws.com/1.jpg')] bg-gray-700 bg-blend-multiply bg-cover">
                    <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <h1 className="mb-20 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Welcome to CampusConnect: Bilkent University's Social Marketplace</h1>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center font-thin sm:space-y-0">
                            <button onClick={scrollToTarget}  className="inline-flex justify-center items-center py-3 px-5 text-lg text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                                Get started
                                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </section>
                <div ref={targetRef} className="px-20 py-10 bg-gray-100">
                    <div className="grid grid-cols-4 gap-20">
                        {products.map(product => (
                            <ProductCard key={product.itemId} product={product} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default withBackButtonListener(MainPage);