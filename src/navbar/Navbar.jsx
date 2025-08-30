import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-orange-500 text-white p-2">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
       
        <div className="flex items-center">
          <img src="logo.png" alt="Logo" className="w-11 h-11 rounded-full" />
          <p className="ml-2 font-bold">BusTracking</p>
        </div>

       
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

  
        <div
          className={`flex flex-col md:flex-row md:items-center md:space-x-5 absolute md:static bg-orange-500 w-full left-0 md:w-auto transition-all duration-300 ${
            isOpen ? "top-14" : "-top-96"
          } md:top-auto`}
        >
          <Link to="/" className="block px-4 py-2 md:p-0">
            Home
          </Link>
          <Link to="/about" className="block px-4 py-2 md:p-0">
            About
          </Link>
          <Link to="/route/1" className="block px-4 py-2 md:p-0">
            Location
          </Link>
          <Link to="/Contact" className="block px-4 py-2 md:p-0">
            Contact
          </Link>
          <Link to="/about/helpline" className="block px-4 py-2 md:p-0">
            HelpLine_Key
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
