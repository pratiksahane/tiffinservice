import React from 'react'
import { FaBus } from 'react-icons/fa'

const WhyChoose = () => {
  return (
    <>
    <div className='py-14 md:py-28 bg-gray-50'>
        <div className='container'>
            {/*Heading section */}
            <h1 data-aos="fade" className='pb-16 tracking-wider text-2xl font-semibold text-dark text-center'>Why Choose Us</h1>
        </div>
        {/*card section */}
        <div data-aos="fade" data-aos-delay="300">
           <div className='grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-4'>
        {/* 1st card */}
        <div className='text-center flex justify-center items-center flex-col gap-1 px-2'>
           <p className='text-dark/70 font-semibold'><span className='text-primary'>Delicious, Homemade Meals:</span> Our tiffins are crafted with love and care using fresh, locally sourced ingredients. Each meal is prepared by experienced chefs who prioritize flavour and nutrition, ensuring you enjoy a taste of home every day.</p> 
           <p className='text-5xl rotate-90 text-primary text-center translate-x-5'>....</p>
           <FaBus className="text-5xl text-primary" />
        </div> 
        
        {/* 2nd card */}
        <div className='text-center flex justify-center items-center flex-col gap-1 px-2'>
            <FaBus className="text-5xl text-secondary" />
           <p className='text-5xl rotate-90 text-secondary text-center translate-x-5'>....</p>
           <p className='text-dark/70 font-semibold'><span className='text-secondary'>Affordable Pricing:</span> Quality doesn’t have to break the bank. Our tiffin service offers excellent value for money, with competitive pricing that makes nutritious, delicious meals accessible to everyone.</p> 
        </div>
        
        {/* 3rd card */}
        <div className='text-center flex justify-center items-center flex-col gap-1 px-2'>
           <p className='text-dark/70 font-semibold'><span className='text-primary'>Exceptional Customer Service:</span> Your satisfaction is our priority. Our friendly and responsive customer service team is always available to assist with any queries or special requests. We value your feedback and strive to improve our service continuously.</p> 
           <p className='text-5xl rotate-90 text-primary text-center translate-x-5'>....</p>
           <FaBus className="text-5xl text-primary" />
        </div> 
        
        {/* 4th card */}
        <div className='text-center flex justify-center items-center flex-col gap-1 px-2'>
            <FaBus className="text-5xl text-secondary" />
           <p className='text-5xl rotate-90 text-secondary text-center translate-x-5'>....</p>
           <p className='text-dark/70 font-semibold'><span className='text-secondary'>Hygiene and Safety:</span> We adhere to the highest standards of hygiene and safety in our kitchen. Our stringent quality controls ensure that every meal is prepared in a clean, safe environment, giving you peace of mind with every bite.</p> 
        </div>

            </div> 
        </div>
    </div>
    </>
  )
}

export default WhyChoose