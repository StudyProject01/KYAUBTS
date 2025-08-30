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
    <div className="p-4 flex flex-col  ">
      <p className="text-lg font-bold mb-4">{findData?.Location} Rout</p>

  {findData?.Rute?.length ? (
  <ul className="flex  ">
    {findData.Rute.map((stop, index) => (
      <li key={index} className="flex flex-col items-center">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-red-500" />
          <span
            className={`${
              findData.Rute.length <= 12 ? "text-sm" : "text-xs"
            }`}
          >
            {stop}
          </span>
        </div>
        {findData.Distance?.[index] && (
          
          <span className="ml-6 text-gray-500 flex items-center text-xs">
            
            {findData.Distance[index]}
            <HiOutlineArrowNarrowRight className="ml-1"  />
          </span>
          
        )}
      </li>
    ))}
  </ul>
) : (
  <p>Bus not found or route is empty</p>
)}

       <FontAwesomeIcon icon={faBusSide} className="text-2xl mt-2 text-orange-500" />

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
