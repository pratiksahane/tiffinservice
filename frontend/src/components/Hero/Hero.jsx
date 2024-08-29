import React from 'react';
import HeroImg from "../../assets/Hero2.png";
import HeroBg from "../../assets/HeroBg.png";
import PrimaryButton from '../Shared/PrimaryButton';

const BgStyle = {
  backgroundImage: `url(${HeroBg})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  width: "100%",
  height: "100%",
};

const Hero = ({HandlePopup}) => {
  return (
    <div style={BgStyle} className='relative'>
      <div className='container py-16 sm:py-0'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 place-items-center min-h-[600px]'>
          {/* Text-content section */}
          <div className='space-y-7 text-dark order-2 sm:order-1'>
            <h1 data-aos="fade-up" className='text-5xl'>
              Tiffin services now in your locality brought together by <span className='text-secondary font-cursive text-7xl'>ghar 2 ghar</span>
            </h1>
            <p data-aos="fade-up" data-aos-delay="300" className='lg:pr-64'>
              Delicious food now delivered to your door
            </p>
            {/* Button section */}
            <div data-aos="fade-up" data-aos-delay="500">
              <button onClick={HandlePopup}>
            <PrimaryButton onClick={HandlePopup}/>
            </button>
            </div>
          </div>

          {/* Image section */}
          <div data-aos="zoom-in" data-aos-delay="500" className='relative z-10 order-1 sm:order-2'>
            <img src={HeroImg} alt="Delicious meals" className='w-full max-w-sm sm:max-w-md sm:scale-125 sm:translate-y-16' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
