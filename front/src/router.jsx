import React from "react";
import {createBrowserRouter, RouterProvider, useParams} from "react-router-dom";
import AuthenticationPage from "./pages/AuthenticationPage.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import ChangePassword from "./pages/PasswordChangePage.jsx";
import MainPage from "./pages/MainPage.jsx";
import PostProductPage from "./pages/PostProductPage.jsx";
import PreviewProductsPages from "./pages/PreviewProductsPages.jsx";
import ViewDetailsPage from "./pages/ViewDetailsPage.jsx";

function CategoryWrapper() {
    const { categoryName } = useParams();
    return <PreviewProductsPages categoryName={decodeURIComponent(categoryName)} />;
}
function Router () {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <AuthenticationPage />,
        },
        {
            path: '/sign-up',
            element: <RegistrationPage />,
        },
        {
            path: '/change-password',
            element: <ChangePassword />,
        },
        {
            path: '/home',
            element: <MainPage />,
        },
        {
            path: '/post-item',
            element: <PostProductPage />,
        },
        {
            path: '/category/:categoryName',
            element: <CategoryWrapper/>
        },
        {
            path: '/view-details/:itemId',
            element: <ViewDetailsPage/>
        },
    ]);
    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}
export default Router;

