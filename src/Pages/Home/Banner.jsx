import React from 'react';

const Banner = () => {
    return (
        <div className="w-full min-h-[40vh] flex items-center justify-center text-center px-4">
            <div>
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight shadow-text">
                    Take Control of Your Finances.
                </h1>
                <p className="text-xl md:text-2xl mt-4 font-light">
                    Your journey to financial freedom starts today.
                </p>
            </div>
        </div>
    );
};

export default Banner;