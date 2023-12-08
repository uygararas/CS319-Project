import Navbar from "../components/Navbar.jsx";
import ProductCard from "../components/ProductCard.jsx";
import {useEffect, useRef, useState} from "react";
import apiService from '../services/apiService';


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

    useEffect(() => {
        getProducts();
    }, []);
    const getProducts = async () => {
        try {
            const response = await apiService.get('/items');
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
                <section className="h-screen bg-center bg-no-repeat bg-[url('https://scontent.fesb3-1.fna.fbcdn.net/v/t31.18172-8/21552009_1489979164372853_664001206582317381_o.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7f8c78&_nc_ohc=BvWX9HNCbB0AX8rZbcq&_nc_ht=scontent.fesb3-1.fna&oh=00_AfCNJSyQLjQUp-vy5P_15esVv079DZNMAz0J7XJPC3AIVA&oe=657C3C63')] bg-gray-700 bg-blend-multiply">
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
                <div ref={targetRef} className="px-20 py-10 bg-gradient-to-b from-[#18181b] to-blue-300">
                    <div className="grid grid-cols-4 gap-20">
                        {products.map(product => (
                            <ProductCard key={product.itemId} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;