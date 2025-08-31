import React from 'react';
import './Footer.css';
import { FaFacebook } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaTwitter } from "react-icons/fa";
import { GoArrowSwitch } from "react-icons/go";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='mb-10 text-white grid grid-cols-1 md:grid-cols-2 text-center md:text-left '>
      
      {/* /* Left Section  */}
      <div className="left p-6 md:p-14">
        <p className='font-bold text-2xl mb-5'>CONTACT US</p>
        <div>
          <p className='arrow'><span>Sirajganj Sadar</span> <span className="mx-2"><GoArrowSwitch /></span> <span>Campus</span></p>
          <p className='arrow'><span>Ullapara</span> <span className="mx-2"><GoArrowSwitch /></span> <span>Campus</span></p>
          <p className='arrow'><span>Shahzadpur</span> <span className="mx-2"><GoArrowSwitch /></span> <span>Campus</span></p>
          <p className='arrow'><span>Pabna</span> <span className="mx-2"><GoArrowSwitch /></span> <span>Campus</span></p>
        </div>
        <div className="mt-3">
          <p>+880123456789</p>
          <p>Sun-Thu, 8:15am-5:10pm</p>
        </div>
      </div>
      
      {/* /* Right Section  */}
      <div className="right p-6 md:p-16 flex flex-col items-center md:items-start mt-0 md:mt-0">
        <p className='font-bold text-2xl mb-3'>Follow Us</p>
        <p>Join us on social media</p>
        <div className="flex mt-3 icons gap-5 justify-center md:justify-start">
          <Link><FaFacebook className='text-xl' /></Link>
          <Link><IoIosMail className='text-xl' /></Link>
          <Link><FaTwitter className='text-xl text-sky-500' /></Link>
        </div>
      </div>

    </div>
  );
};

export default Footer;
