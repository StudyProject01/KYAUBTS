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
      <p className="text-lg font-bold mb-4">
        {findData?.Location} Route</p>
<div className="flex flex-row md:flex-col items-start gap-4">
  {/* Route List */}
  {findData?.Rute?.length ? (
    <ul className="flex flex-col w-[100px] md:w-auto sm:flex-row sm:flex-wrap sm:items-start gap-4">
      {findData.Rute.map((stop, index) => (
        <li key={index} className="flex flex-col items-start">
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
              <HiOutlineArrowNarrowRight className="ml-1 rotate-90 sm:rotate-0 text-gray-400" />
            </span>
          )}
        </li>
      ))}
    </ul>
  ) : (
    <p>Bus not found or route is empty</p>
  )}

  {/* Bus Icon */}
  <div className="flex-shrink-0 mt-4 md:mt-0 flex justify-center md:justify-start items-center relative">
    <FontAwesomeIcon
      icon={faBusSide}
       className="text-orange-500 text-2xl transform  rotate-90 sm:scale-x-100 sm:rotate-0 sm:left-5 relative"
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
