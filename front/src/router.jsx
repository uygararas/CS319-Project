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
import OldPostsPage from "./pages/OldPostsPage.jsx";
import InAppChatsPage from "./pages/InAppChatsPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import PasswordForgotPage from "./pages/PasswordForgotPage.jsx";
import PasswordResetVerificationPage from "./pages/PasswordResetVerificationPage.jsx";
import UpdateProductPage from "./pages/UpdateProductPage.jsx";
import SearchResultsPage from "./pages/SearchResultsPage.jsx";
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CommunityGuidelinesPage from "./pages/CommunityGuidelinesPage.jsx";

function CategoryWrapper() {
    const { categoryName } = useParams();
    return <PreviewProductsPages categoryName={decodeURIComponent(categoryName)} />;
}

function ChatPageWrapper() {
    const params = useParams();
    return <ChatPage {...params} />;
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
            path: '/about',
            element: <AboutPage />
        },
        {
            path: '/community-guidelines',
            element: <CommunityGuidelinesPage />
        },
        {
            path: '/Contact',
            element: <ContactPage />
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
        {
            path: '/chat/:sellerId',
            element: <ChatPageWrapper /> // Wrapped ChatPage to handle dynamic route parameter
        },
        {
            path: '/in-app-chats',
            element: <InAppChatsPage />
        },
        {
            path: '/password-forgot-page',
            element: <PasswordForgotPage />
        },
        {
            path: '/password-reset-verification',
            element: <PasswordResetVerificationPage />
        },
        {
            path: '/update-product/:itemId',
            element: <UpdateProductPage/>
        },
        {
            path:'/search-results',
            element: <SearchResultsPage/>
        }
    ]);

    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}

export default Router;
