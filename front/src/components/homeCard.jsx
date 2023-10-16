function HomeCard () {
    return(
        <div className="max-w-sm bg-white border border-gray-200 shadow rounded-lg dark:bg-gray-900 dark:border-gray-700">
            <img className="p-1 mb-1" src="src/components/item-photo.png" alt="item-photo" />
            <div className="p-2">
                <h5 className="mb-1 ml-1 text-lg font-medium tracking-tight text-gray-900 dark:text-white">Item Title</h5>
                <h6 className="mb-3 ml-1 font-normal text-sm text-gray-700 dark:text-gray-400">Item Category</h6>
                <div className="grid grid-cols-2 gap-1">
                    <button type="button" className="inline-flex px-2 py-2 text-sm font-sm items-center justify-center text-white rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        View Item
                    </button>
                    <button type="button" className="inline-flex px-2 py-2 text-sm font-sm items-center justify-center text-white rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HomeCard;