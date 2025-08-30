import React from "react";
import { Link } from "react-router-dom";

const ShowCart = ({ data }) => {
  const { img, name, id } = data;

  return (
    <div className="w-full sm:w-72 md:w-80 lg:w-80 mx-auto mb-8">
      <div className="card bg-base-100 shadow-xl h-full flex flex-col">
     
        <figure className="h-48 sm:h-56 md:h-60 lg:h-64 overflow-hidden">
          <img
            src={img}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </figure>

        /* Card Body */
        <div className="card-body flex flex-col justify-between">
          <h2 className="card-title text-center text-lg sm:text-xl md:text-2xl">{name}</h2>
          <div className="card-actions justify-center mt-2">
            <Link to={`/route/${id}`}>
              <button className="btn btn-primary w-full sm:w-auto">Location</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCart;
