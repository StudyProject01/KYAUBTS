import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./home.css"
const Banner = () => {
    return (
        <div>
       <Carousel className='uppercase'
                autoPlay={true}
                interval={3000}
                infiniteLoop={true}>
                <div className='tops'>
                    <img src="bus0.jpeg" />
                    <p className="legend">Sirajganj_Sadar</p>
                </div>
                <div className='tops'>
                    <img src="bus2.jpeg" />
                    <p className="legend">Ullapara</p>
                </div>
                <div className='tops' >
                    <img src="bus4.jpeg" />
                    <p className="legend ">shahzadpur</p>
                </div>
                <div className='tops'>
                     <img src="bus1.jpeg" />
                    <p className="legend">Pabna</p>
                </div>
                
            </Carousel>
            <div className="">
                <p className='text-3xl font-bold text-center mt-10 mb-5'>BUS_SCHEDULE </p>
                <img className='w-[70%] h-96 mb-10 m-auto' src="schedule.jpeg" alt="" />
            </div>
        </div>
        
    );
};

export default Banner;