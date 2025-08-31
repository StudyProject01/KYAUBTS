import React, { useState } from "react";
import "../index.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-orange-500 p-2 w-full m-0"> 
      <div className="flex justify-between items-center text-white">
        
        {/* /* Logo  */}
        <div className="flex items-center">
          <a>
            <img src="logo.png" className="w-[45px] rounded-full" alt="Logo" />
          </a>
          <p className="ml-2 font-bold">BusTracking</p>
        </div>

        {/* /* Desktop Links  */}
        <div className="hidden sm:flex mr-20">
          <Link to="/" className="ml-5">Home</Link>
          <Link to="/about" className="ml-5">About</Link>
          <Link to="/route/1" className="ml-5">Location</Link>
          <Link to="/Contact" className="ml-5">Contact</Link>
          <Link to="/about/helpline" className="ml-5">HelpLine_Key</Link>
        </div>

         {/* Hamburger Icon for Mobile */}
        <div className="sm:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              // Close icon
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger icon
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu (only visible when isOpen = true) */}
      {isOpen && (
        <div className="flex flex-col items-center sm:hidden mt-2 bg-orange-500 text-white">
          <Link to="/" className="py-2" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" className="py-2" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/route/1" className="py-2" onClick={() => setIsOpen(false)}>Location</Link>
          <Link to="/Contact" className="py-2" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link to="/about/helpline" className="py-2" onClick={() => setIsOpen(false)}>HelpLine_Key</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
