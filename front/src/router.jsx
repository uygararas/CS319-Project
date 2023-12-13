import React from "react";
import { createBrowserRouter, RouterProvider, useParams } from "react-router-dom";
import AuthenticationPage from "./pages/AuthenticationPage.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import ChangePassword from "./pages/PasswordChangePage.jsx";
import MainPage from "./pages/MainPage.jsx";
import PostProductPage from "./pages/PostProductPage.jsx";
import PreviewProductsPages from "./pages/PreviewProductsPages.jsx";
import ViewDetailsPage from "./pages/ViewDetailsPage.jsx";
import EmailVerificationPage from "./pages/EmailVerificationPage.jsx";
import ActivePostsPage from "./pages/ActivePostsPage.jsx";
import OldPostsPage from "./pages/OldPostsPage.jsx"; // Import the new component
//import MessagingPage from "./pages/MessagingPage.jsx";
import InAppChatsPage from "./pages/InAppChatsPage.jsx"


function CategoryWrapper() {
    const { categoryName } = useParams();
    return <PreviewProductsPages categoryName={decodeURIComponent(categoryName)} />;
}

function Router() {
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
            element: <CategoryWrapper />
        },
        {
            path: '/view-details/:itemId',
            element: <ViewDetailsPage />
        },
        {
            path: '/verify-email',
            element: <EmailVerificationPage />
        },
        {
            path: '/active-posts',
            element: <ActivePostsPage />
        },
        {
            path: '/old-posts',
            element: <OldPostsPage />
        },
        {/*
            path: '/messages',
            element: <MessagingPage />
        */},
        {
            path: '/in-app-chats',
            element: <InAppChatsPage />
        }
    ]);

    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}

export default Router;
