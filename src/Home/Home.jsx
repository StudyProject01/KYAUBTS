import React from 'react';
import Banner from './banner';
import Cart from '../cart/Cart';

const Home = () => {
    return (
        <div className="px-4 sm:px-6 md:px-8">
             <Banner />

            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mt-8 sm:mt-12 md:mt-16 mb-8 sm:mb-12 md:mb-16">
                ALL_BUSES ROUTE
            </p>

            <div className="mb-10">
                <Cart />
            </div>
        </div>
    );
};

export default Home;
