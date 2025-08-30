import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaMapMarkerAlt } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBusSide } from "@fortawesome/free-solid-svg-icons";
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
    <div className="p-4 flex flex-col max-w-5xl mx-auto">
      <p className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-center">
        {findData?.Location} Route
      </p>

      {findData?.Rute?.length ? (
        <ul className="flex flex-wrap justify-center gap-6">
          {findData.Rute.map((stop, index) => (
            <li key={index} className="flex flex-col items-center w-24 sm:w-28 md:w-32">
              <div className="flex items-center gap-2 text-center">
                <FaMapMarkerAlt className="text-red-500 text-lg sm:text-xl" />
                <span
                  className={`${
                    findData.Rute.length <= 12 ? "text-sm sm:text-base" : "text-xs sm:text-sm"
                  }`}
                >
                  {stop}
                </span>
              </div>
              {findData.Distance?.[index] && (
                <span className="mt-1 text-gray-500 flex items-center text-xs sm:text-sm">
                  {findData.Distance[index]}
                  <HiOutlineArrowNarrowRight className="ml-1" />
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600 mt-4">Bus not found or route is empty</p>
      )}

      <div className="flex justify-center mt-4">
        <FontAwesomeIcon icon={faBusSide} className="text-3xl sm:text-4xl md:text-5xl text-orange-500" />
      </div>

      <div className="mt-6 flex justify-center md:justify-start">
        <Link to={"/"}>
          <button className="btn btn-neutral flex items-center gap-2 px-4 py-2 text-sm sm:text-base md:text-base">
            <FaArrowLeft /> HOME
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TrackingRoute;
