import React from "react";
import {createBrowserRouter, RouterProvider, useParams} from "react-router-dom";
import LoginPage from "./pages/loginPage.jsx";
import SignUpForm from "./pages/signUpForm.jsx";
import ChangePassword from "./pages/changePassword.jsx";
import Homepage from "./pages/homepage.jsx";
import PostItem from "./pages/postItem.jsx";
import CategoryPages from "./pages/categoryPages.jsx";

function CategoryWrapper() {
    const { categoryName } = useParams();
    return <CategoryPages categoryName={decodeURIComponent(categoryName)} />;
}
function Router () {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <LoginPage />,
        },
        {
            path: '/sign-up',
            element: <SignUpForm />,
        },
        {
            path: '/change-password',
            element: <ChangePassword />,
        },
        {
            path: '/home',
            element: <Homepage />,
        },
        {
            path: '/post-item',
            element: <PostItem />,
        },
        {
            path: '/category/:categoryName',
            element: <CategoryWrapper/>
        },
    ]);
    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}
export default Router;

