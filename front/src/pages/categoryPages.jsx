import Navbar from "../components/navbar.jsx";
import CategoryPageMiddle from "../components/categoryPagesMiddle.jsx";

// eslint-disable-next-line react/prop-types
function CategoryPages({categoryName}) {
    return(
        <div>
            <Navbar />
            <CategoryPageMiddle categoryName = {categoryName} />
        </div>
    );
}
export default CategoryPages;