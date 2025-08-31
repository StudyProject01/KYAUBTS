import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Footer from '../Footer/Footer';

const Main = () => {
    return (
        <div className="bg-sky-50 sm:w-11/12 md:w-10/12 lg:w-11/12 mx-auto mt-5">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;
