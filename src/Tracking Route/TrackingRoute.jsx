import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";


import Maplocation from "./MapLocation";
import Manualbus from "./manualbus";


const TrackingRoute = () => {
 
  

  return (
    <div className="p-4">

      <div className="ManualRoute">
       <Manualbus></Manualbus>
      </div>

  <div className="live location ">
        <Maplocation></Maplocation>
  </div>


      {/* Home Button */}
      <div className="mt-4">
        <Link to={"/"}>
          <button className="btn btn-neutral flex items-center gap-2">
            <FaArrowLeft /> HOME
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TrackingRoute;
