import React from "react";
import "../index.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="bg-orange-500  m-auto p-2">
      <div className="navbar bg-orange-500 text-white flex justify-between">
        <div className=" flex items-center  ">
          <a className=" ">
            <img src="logo.png" className="w-[45px] rounded-full  " alt="" />
          </a>
          <p className="ml-2 font-bold">BusTracking</p>
        </div>

        <div className="flex mr-20">
          <Link to={"/"} className="ml-5" >Home</Link>
          <Link to={"/about"} className="ml-5" >About</Link>
          <Link to={"/route/1"} className="ml-5" >Location</Link>
          <Link to={"/Contact"} className="ml-5" >Contact</Link>
          <Link to={"/about/helpline"} className="ml-5" >HelpLine_Key</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
