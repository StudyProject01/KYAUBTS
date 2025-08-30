import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-orange-500 text-white px-4 sm:px-6 py-2">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        /* Logo */
        <div className="flex items-center">
          <img src="logo.png" alt="Logo" className="w-10 h-10 rounded-full" />
          <p className="ml-2 font-bold text-lg">BusTracking</p>
        </div>

        /* Desktop Links */
        <div className="hidden md:flex space-x-6">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/route/1">Location</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about/helpline">HelpLine_Key</Link>
        </div>

        /* Mobile Menu Button */
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      /* Mobile Menu */
      {isOpen && (
        <div className="md:hidden mt-2 flex flex-col space-y-2 px-2 pb-2">
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/route/1" onClick={() => setIsOpen(false)}>Location</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link to="/about/helpline" onClick={() => setIsOpen(false)}>HelpLine_Key</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
