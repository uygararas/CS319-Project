//this class is used for back buttons functionality to prevent frozen buttons when the back button is used
// withBackButtonListener.jsx
import React, { useEffect } from 'react';

const withBackButtonListener = (WrappedComponent) => {
    return (props) => {
        useEffect(() => {
            const handlePopState = () => {
                // Refresh the page on back button press
                window.location.reload();
            };

            window.addEventListener('popstate', handlePopState);
            return () => window.removeEventListener('popstate', handlePopState);
        }, []);

        return <WrappedComponent {...props} />;
    };
};

export default withBackButtonListener;
