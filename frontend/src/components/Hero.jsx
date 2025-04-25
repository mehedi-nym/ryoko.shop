import React from 'react';
import Slider from "react-slick";
import { assets } from '../assets/assets'; // Adjust the path as per your structure

const Hero = () => {
  // Slider settings
  const sliderSettings = {
    dots: false, // Dots are disabled
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false, // Prevents stop on hover
    pauseOnFocus: false, // Prevents stop on focus
    pauseOnDotsHover: false, // Prevents stop when dots are hovered (even though dots are disabled)
  };

  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
        {/* Hero Left Side */}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className='text-[#414141]'>
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-[2px] bg-[#FF33CC]'></p>
                    <p className='font-medium text-sm md:text-base'>OUR BEST SELLING</p>
                </div>
                <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
                <div className='flex items-center gap-2'>
                    <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                    <p className='w-8 md:w-11 h-[2px] bg-[#FF33CC]'></p>
                </div>
            </div>
        </div>
        {/* Hero Right Side - Slider */}
        <div className='w-full h-full sm:w-1/2'>
            <Slider {...sliderSettings}>
                <div>
                    <img className='w-full h-full block' src={assets.traveller_walking} alt="Traveler Walking" />
                </div>
                <div>
                    <img className='w-full h-full block' src={assets.camp_night} alt="Another Image" />
                </div>
                {/* Add more slides as needed */}
            </Slider>
        </div>
    </div>
  );
}

export default Hero;
