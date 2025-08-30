import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "./home.css";

const Banner = () => {
    return (
        <div>
            /* Carousel */
            <Carousel
                className='uppercase'
                autoPlay={true}
                interval={3000}
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
            >
                <div className='relative'>
                    <img
                        src="bus0.jpeg"
                        className="w-full h-48 sm:h-64 md:h-96 object-cover"
                        alt="Sirajganj Sadar"
                    />
                    <p className="legend text-sm sm:text-base md:text-lg">Sirajganj_Sadar</p>
                </div>
                <div className='relative'>
                    <img
                        src="bus2.jpeg"
                        className="w-full h-48 sm:h-64 md:h-96 object-cover"
                        alt="Ullapara"
                    />
                    <p className="legend text-sm sm:text-base md:text-lg">Ullapara</p>
                </div>
                <div className='relative'>
                    <img
                        src="bus4.jpeg"
                        className="w-full h-48 sm:h-64 md:h-96 object-cover"
                        alt="Shahzadpur"
                    />
                    <p className="legend text-sm sm:text-base md:text-lg">Shahzadpur</p>
                </div>
                <div className='relative'>
                    <img
                        src="bus1.jpeg"
                        className="w-full h-48 sm:h-64 md:h-96 object-cover"
                        alt="Pabna"
                    />
                    <p className="legend text-sm sm:text-base md:text-lg">Pabna</p>
                </div>
            </Carousel>

            /* Bus Schedule */
            <div className="mt-10 px-4">
                <p className='text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-5'>BUS SCHEDULE</p>
                <img
                    src="schedule.jpeg"
                    alt="Bus Schedule"
                    className='w-full sm:w-4/5 md:w-3/5 h-auto md:h-96 mx-auto rounded shadow-lg object-cover'
                />
            </div>
        </div>
    );
};

export default Banner;
