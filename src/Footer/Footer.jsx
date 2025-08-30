import React from 'react';
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { GoArrowSwitch } from "react-icons/go";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className='bg-orange-500 text-white py-10 px-4'>
            <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10'>

                /* Left Section */
                <div className="flex flex-col space-y-6">
                    <p className='font-bold text-2xl'>CONTACT US</p>

                    <div className='flex flex-col gap-2 text-sm sm:text-base'>
                        <p className='flex items-center gap-2'>
                            <span>Sirajganj Sadar</span> 
                            <GoArrowSwitch /> 
                            <span>Campus</span>
                        </p>
                        <p className='flex items-center gap-2'>
                            <span>Ullapara</span> 
                            <GoArrowSwitch /> 
                            <span>Campus</span>
                        </p>
                        <p className='flex items-center gap-2'>
                            <span>Shahzadpur</span> 
                            <GoArrowSwitch /> 
                            <span>Campus</span>
                        </p>
                        <p className='flex items-center gap-2'>
                            <span>Pabna</span> 
                            <GoArrowSwitch /> 
                            <span>Campus</span>
                        </p>
                    </div>

                    <div className='text-sm sm:text-base'>
                        <p>+880123456789</p>
                        <p>Sun-Thu, 8:15am-5:10pm</p>
                    </div>
                </div>

                /* Right Section */
                <div className="flex flex-col space-y-4">
                    <p className='font-bold text-2xl'>Follow Us</p>
                    <p>Join us on social media</p>
                    <div className='flex gap-5 mt-2 text-xl'>
                        <Link><FaFacebook /></Link>
                        <Link><IoIosMail /></Link>
                        <Link><FaTwitter className='text-sky-500' /></Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
