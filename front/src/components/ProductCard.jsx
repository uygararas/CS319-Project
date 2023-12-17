//this product card is used in every class that item is used retrieved or changed
//this is like a wrapper component
// eslint-disable-next-line react/prop-types
import apiService from "../services/apiService.js";
import {useEffect, useState} from "react";

function ProductCard ({ product }) {
    // eslint-disable-next-line react/prop-types
    const { imageUrl, title, description, category, itemId, createdAt, userId } = product;
    function formatItemType(type) {
        switch (type) {
            case 'secondHandItem':
                return 'Second Hand Item';
            case 'donatedItem':
                return 'Donated Item';
            case 'lostItem':
                return 'Lost Item';
            case 'foundItem':
                return 'Found Item';
            case 'lendItem':
                return 'Lend Item';
            case 'rentedItem':
                return 'Rented Item';
            default:
                return 'Unknown Type';
        }
    }

    useEffect(() => {
        fetchUserEmail();
    }, []);

    const fetchUserEmail = async () => {
        try {
            const response = await apiService.getEmailByUserId(userId);
            const username = response.split('@')[0]; // Splits the email and takes the first part
            setEmail(username);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }

    function getBorderColorClass(type) {
        switch (type) {
            case 'secondHandItem':
                return 'border-blue-500';
            case 'donatedItem':
                return 'border-green-500';
            case 'lostItem':
                return 'border-red-500';
            case 'foundItem':
                return 'border-yellow-500';
            case 'lendItem':
                return 'border-purple-500';
            case 'rentedItem':
                return 'border-orange-500';
            default:
                return 'border-gray-300';
        }
    }

    function getTextColorClass(type) {
        switch (type) {
            case 'secondHandItem':
                return 'hover:text-blue-500';
            case 'donatedItem':
                return 'hover:text-green-500';
            case 'lostItem':
                return 'hover:text-red-500';
            case 'foundItem':
                return 'hover:text-yellow-500';
            case 'lendItem':
                return 'hover:text-purple-500';
            case 'rentedItem':
                return 'hover:text-orange-500';
            default:
                return 'hover:text-gray-300';
        }
    }

    const itemTypeFormatted = formatItemType(category);
    const [email, setEmail] = useState("");
    function formatTimestamp(timestamp) {
        const now = new Date();
        const postedDate = new Date(timestamp);
        const diffInMs = now - postedDate;
        const diffInHours = diffInMs / (1000 * 60 * 60);

        if (diffInHours < 1) {
            return `Posted just now`;
        } else if (diffInHours < 24) {
            return `Posted ${Math.round(diffInHours)} hours ago`;
        } else {
            const diffInDays = diffInHours / 24;
            return `Posted ${Math.round(diffInDays)} days ago`;
        }
    }
    return(
        <div className={`border border-3 ${getTextColorClass(category)} rounded bg-white ${getBorderColorClass(category)} flex flex-col`}>
            <div className="flex justify-center items-center overflow-hidden" style={{ height: '200px' }}> {/* Adjust height as needed */}
                <img className="max-w-full max-h-full p-2" src={imageUrl} alt="item-photo" style={{ objectFit: 'contain' }} />
            </div>
            <div className={`p-[16px] text-center space-y-[8px] border-b ${getBorderColorClass(category)} flex flex-col flex-grow`}>
                <a href="" className="productCardTitle truncate">{title}</a>
                <h6 className="productCardExplanation truncate">{description}</h6>
            </div>
            <div className="p-[16px] text-center">
                <h6 className={`productCardCategory mb-[16px] pb-[16px] border-b ${getBorderColorClass(category)}`}>{itemTypeFormatted}</h6>
                <a href={`/view-details/${itemId}`} className="hover:underline productCardTitle hover:text-blue-text">
                    <div className="flex items-center text-sm justify-center">
                        View Details
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </div>
                </a>
            </div>
            <p className="body-mini text-center p-2">{formatTimestamp(createdAt)} by {email}</p>
        </div>
    );
}
export default ProductCard;