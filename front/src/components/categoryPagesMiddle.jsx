import ItemCard from "./itemCard.jsx";
// eslint-disable-next-line react/prop-types
function CategoryPageMiddle({categoryName}) {
    return(
        <div className="px-20 py-10 bg-gradient-to-b from-white to-gray-300">
            {/* eslint-disable-next-line react/prop-types */}
            <div className="grid grid-cols-4 gap-20 ">
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