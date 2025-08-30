import React from 'react';
import Banner from './banner';
import Cart from '../cart/Cart';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
               <p className="text-3xl font-bold text-center mt-16 mb-16">ALL_BUSES ROUTE</p>
            <Cart></Cart>
        </div>
    );
};

export default Home;