import ItemCard from "./itemCard.jsx";
// eslint-disable-next-line react/prop-types
function CategoryPageMiddle({categoryName}) {
    return(
        <div className="p-5 bg-gray-800">
            {/* eslint-disable-next-line react/prop-types */}
            <h1 className="text-center text-4xl p-2 mb-5 font-semibold text-white">{categoryName}</h1>
            <div className="grid grid-cols-7 gap-4">
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