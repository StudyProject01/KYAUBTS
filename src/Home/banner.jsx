import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./home.css";
const Banner = () => {
  return (
    <div>
      <Carousel
        autoPlay
        infiniteLoop
        interval={2000}
        showThumbs={false}
        showStatus={false}
      >
        <div className="tops">
          <img src="bus0.jpeg" alt="Sirajganj_Sadar" />
          <p className="legend">Sirajganj_Sadar</p>
        </div>
        <div className="tops">
          <img src="bus2.jpeg" alt="Ullapara" />
          <p className="legend">Ullapara</p>
        </div>
        <div className="tops">
          <img src="bus4.jpeg" alt="Shahzadpur" />
          <p className="legend">Shahzadpur</p>
        </div>
        <div className="tops">
          <img src="bus1.jpeg" alt="Pabna" />
          <p className="legend">Pabna</p>
        </div>
      </Carousel>

      <div className="">
        <p className="text-3xl font-bold text-center mt-10 mb-5">
          BUS_SCHEDULE{" "}
        </p>
        <img className="w-[70%] h-96 mb-10 m-auto" src="schedule.jpeg" alt="" />
      </div>
    </div>
  );
};

export default Banner;
