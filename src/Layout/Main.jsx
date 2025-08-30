import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Footer from '../Footer/Footer';

const Main = () => {
    return (
        <div className="bg-sky-50 w-full sm:w-11/12 md:w-10/12 lg:w-9/12 mx-auto mt-5 px-2 sm:px-4 md:px-6">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;
