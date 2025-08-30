import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Footer from '../Footer/Footer';

const Main = () => {
    return (
        
     <div className="bg-sky-50 w-[90%] m-auto mt-5 ">
            <Navbar></Navbar>
           <Outlet></Outlet>
           <Footer></Footer>
     </div>
    );
};

export default Main;