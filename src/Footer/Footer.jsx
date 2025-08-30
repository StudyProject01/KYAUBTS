import React from 'react';
import './Footer.css'
import { FaFacebook } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaTwitter } from "react-icons/fa";
import { GoArrowSwitch } from "react-icons/go";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='  mb-10 text-white grid grid-cols-2'>
        <div className="left  p-14 items-center ">
            <p className='font-bold text-2xl mb-5 '>CONTACT US</p>
            <div className="">
            <p className='arrow'><span>Sirajang Sadar</span> <span className="ml-2 mr-2"><GoArrowSwitch /></span> <span>Campus</span></p>
            <p className='arrow'><span>Ullapara</span> <span className="ml-2 mr-2"><GoArrowSwitch /></span> <span>Campus</span></p>
            <p className='arrow'><span>Shahzadpur</span> <span className="ml-2 mr-2"><GoArrowSwitch /></span> <span>Campus</span></p>
            <p className='arrow'><span>Pabna</span> <span className="ml-2 mr-2"><GoArrowSwitch /></span> <span>Campus</span></p>
            </div>
            <div className="">
                <p className="">+880123456789</p>
                <p>Sun-Thu,8:15am-5:10pm</p>
            </div>
  
        </div>
        <div className="right items-center p-16  ">
            <p className='font-bold text-2xl mb-3'>Follow US</p>
            <p>Join us on social media</p>
            <div className="flex mt-3 icons gap-5">
                <Link><FaFacebook className='text-xl' /></Link>
                <Link><IoIosMail className='text-xl tet' /></Link>
                <Link><FaTwitter className='text-xl text-sky-500' /></Link>
            </div>
        </div>
        </div>
    );
};

export default Footer;