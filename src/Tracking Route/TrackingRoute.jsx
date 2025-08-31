import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaMapMarkerAlt } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBusSide } from "@fortawesome/free-solid-svg-icons";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const TrackingRoute = () => {
  const [RouteTack, SetRoute] = useState([]);
  const { busId } = useParams();


  useEffect(() => {
    fetch("/routeApi.json")
      .then((res) => res.json())
      .then((data) => SetRoute(data));
  }, []);

  const findData = RouteTack.find((data) => data.id == busId);
  return (
  <div className="p-4">
  <p className="text-lg font-bold mb-4">{findData?.Location} Route</p>
  <div className=" flex gap-4 ">
  
{findData?.Rute?.length ? (
  <ul className="flex flex-col sm:flex-row sm:flex-wrap sm:items-start gap-4">
    {findData.Rute.map((stop, index) => (
      <li key={index} className="flex flex-col items-start"> {/* Align left */}
        {/* Stop Name with Marker */}
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-red-500" />
          <span className={`${findData.Rute.length <= 10 ? "text-sm" : "text-xs"}`}>
            {stop}
          </span>
        </div>

        {/* Distance with Arrow */}
        {findData.Distance?.[index] && (
          <span className="text-gray-500 flex items-center text-xs mt-1">
            {findData.Distance[index]}
            <HiOutlineArrowNarrowRight className="ml-1 transform rotate-90 text-gray-400" />
          </span>
        )}
      </li>
    ))}
  </ul>
) : (
  <p>Bus not found or route is empty</p>
)}

<div className="flex-shrink-0  h-0 flex justify-center sm:justify-start mt-2 sm:mt-0    transform rotate-90 ">
  <FontAwesomeIcon 
    icon={faBusSide} 
    className="text-orange-500 text-2xl transform scale-z-[-1]" 
  />
</div>
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
