import React from "react";
import { Link } from "react-router-dom";

const ShowCart = ({ data }) => {
  const { img, name, from, to, id } = data;
  return (
    <div>
      <div className="card w-[340px] h-80 m-auto mb-16 bg-base-100 shadow-xl ">
        <figure>
          <img className="w-full h-full" src={img} alt="Shoes" />
        </figure>
        <div className="card-body  ">
          <h2 className="card-title m-auto">{name} </h2>
          <div className="card-actions justify-center">
          <Link to={`/route/${id}`}>  <button className="btn btn-primary ">Location</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCart;
