import React from "react";

const NotFoundScreen = () => {
    return (
        <div className="error-screen screen">
            <h1 className="screen-header">Something went wrong</h1>
            <p className="not-found-message">
                Oops! The page you are looking for does not exist.
            </p>
            <img
                src={`${process.env.PUBLIC_URL}/assets/images/404.gif`}
                alt="Page Not Found"
                className="not-found-image"
            />
        </div>
    );
}

export default NotFoundScreen;