import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const PrimaryButton = () => {
  return (
    <>
    <div>
      
    <button type="button" className='flex items-center gap-2 bg-primary text-white px-5 py-2 hover:scale-105 duration-300'>
      Choose Your Meal Plan
    <span>
    <FaArrowRight />
    </span>
    </button>
    </div>
    </>
  );
};

export default PrimaryButton;
