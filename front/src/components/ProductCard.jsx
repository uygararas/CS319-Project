// eslint-disable-next-line react/prop-types
function ProductCard ({ product }) {
    // eslint-disable-next-line react/prop-types
    const { imageUrl, title, description, type, itemId } = product;

    return(
        <div className="border border-gray-300 hover:border-blue-hover-text hover:text-blue-hover-text rounded dark:bg-gray-900 dark:border-gray-700 bg-white">
            <img className="p-[16px]" src={imageUrl} alt="item-photo" />
            <div className="p-[16px] text-center space-y-[8px] border-b border-gray-300">
                <a href="" className="productCardTitle">{title}</a>
                <h6 className="productCardExplanation">{description}</h6>
            </div>
            <div className="p-[16px] text-center">
                <h6 className="productCardCategory mb-[16px] pb-[16px] border-b border-gray-300">{type}</h6>
                <a href={`/view-details/${itemId}`} className="hover:underline productCardTitle hover:text-blue-text">
                    <div className="flex items-center text-sm justify-center">
                        View Details
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </div>
                </a>
            </div>
        </div>
    );
}
export default ProductCard;