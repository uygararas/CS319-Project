function ItemCard () {
    return(
        <div className="bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            <img className="p-2" src="/LogoSymbol.png" alt="item-photo" />
            <div className="p-2 space-y-1 font-light">
                <a href="" className="text-sm tracking-tight text-gray-900 dark:text-white hover:underline">Item Title</a>
                <h6 className="text-xs text-gray-700 dark:text-gray-400">Item Category</h6>
                <h6 className="text-sm text-gray-700 dark:text-white">Item Price</h6>
            </div>
        </div>
    );
}
export default ItemCard;