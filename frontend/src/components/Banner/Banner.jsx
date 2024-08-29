import React from 'react'
import Mango from "../../assets/png/mango.png";
import Grapefruit from "../../assets/png/grapefruit.png";
import Lemon from "../../assets/png/lemon.png";
import Grapes from "../../assets/png/grapes.jpg";
import Cherry from "../../assets/png/cherry.png";
import PrimaryButton from '../Shared/PrimaryButton';

const Banner = ({HandlePopup}) => {
  return (<>
  <div className='container py-14 relative'>
    <div className='realtive z-20'>
       <h1 data-aos="fade-up" data-aos-delay="300" className='py-8 tracking-wider text-2xl font-semibold text-dark text-center'>Taste the healthy Difference</h1> 
       {/*content section*/}
    <div className='space-y-10'>
    <div data-aos="fade-up" data-aos-delay="500"  className='grid grid-cols-1 sm:grid-cols-2 gap-4 py-10'>
            <div>
                <p>{' '}Imagine enjoying <span className='text-primary'> a home-cooked meal </span> without lifting a finger—our tiffin service makes it a reality! We deliver delicious, wholesome meals straight to your door, crafted with fresh, local ingredients and a sprinkle of love.
                </p>
            </div>
        </div>

        <div data-aos="fade-up" data-aos-delay="300" className='grid grid-cols-1 sm:grid-cols-2 gap-4 py-10'>
            <div></div>
            <div>
                <p>{' '}With our <span className='text-primary'>reliable service, eco-friendly packaging, and unbeatable flavours, </span> dining in has never been this delightful or convenient. Discover the joy of truly effortless eating
                </p>
            </div>
        </div>
    </div>
    {/*button section*/}
    <div data-aos="fade-up" data-aos-delay="500" data-aos-offset="0" className='flex justify-center mt-10 sm:mt-14'>
    <button onClick={HandlePopup}>
            <PrimaryButton onClick={HandlePopup}/>
            </button>
    </div>
    </div>

    {/*bg fruit section */}
    <div data-aos="fade-right" className='absolute top-5 -left-16 sm:bottom-0 sm:left-0 opacity-50 sm:opacity-100'>
        <img data-aos="fade-right" src={Cherry} alt="" className='max-w-[160px]'/>
    </div>

    <div data-aos="fade-right" className='absolute -bottom-16 -left-16 sm:bottom-0 sm:left-0
    opacity-50 sm:opacity-100'>
        <img src={Grapes} alt="" className='max-w-[280px]'/>
    </div>

    <div data-aos="fade-left" className='absolute top-20 -right-16 sm:right-20 opacity-50 sm:opacity-100'>
        <img src={Mango} alt="" className='max-w-[200px]'/>
    </div>

    <div data-aos="fade-left" className='hidden sm:block absolute bottom-0 right-0'>
        <img src={Grapefruit} alt="" className='max-w-[200px]'/>
    </div>

    <div data-aos="fade" className='absolute top-1/2 -translate-y-1/2 left-1/3 -translate-x-1/2 opacity-50 sm:opacity-100'>
        <img src={Lemon} alt="" className='max-w-[160px]'/>
    </div>
  </div>
  </>
  );
};

export default Banner