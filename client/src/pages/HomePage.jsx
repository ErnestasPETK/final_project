import React from 'react';

const HomePage = () => {
    if (!localStorage.getItem("token")) {
        window.location.href = "/login";
    }
    return (
        <div className='dark'>
            <div className="h-screen w-screen">
                HOME
            </div>
        </div>
    );
};

export default HomePage;