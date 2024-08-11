import React from 'react'
import { IoLocationSharp } from "react-icons/io5";  // Corrected path
import { FaPhone } from "react-icons/fa6";  // Corrected path
import { MdEmail } from "react-icons/md";  // Corrected path

const Footer = () => {
  return (
    <>
    <div className='text-white mt-20'>
        <div data-aos="fade-down" className='container bg-gradient-to-b from-primary to-primaryDark rounded-t-3xl'>
            {/*heading Section */}
            
                <h1 className='py-10 text-3xl font-bold text-yellow text-center'>Contact Us</h1> 

            {/*Grid  Section */}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-14 border-b-2 border-white pb-6">
            {/*Address  Section */}   
                    <div className='text-center space-y-4'>
                      <div className='flex justify-center'>
                        <IoLocationSharp className='text-5xl' />
                        </div>
                        <p>
                        L. Nappo Road, Matunga,<br/> Mumbai, Maharashtra 400019, India
                          </p>  
                    </div>
            {/*Email  Section */}
                    <div className='text-center space-y-4'>
                      <div className='flex justify-center'>
                        <MdEmail className='text-5xl' />
                        </div>
                        <div>
                        <p>
                        Admin~pratiksahane351@gmail.com
                        </p>
                        <p>dinewithus@gmail.com</p>
                        </div>  
                    </div> 
            {/*Phone number  Section */}
                     <div className='text-center space-y-4'>
                      <div className='flex justify-center'>
                        <FaPhone className='text-5xl' />
                        </div>
                        <div>
                        <p>
                        Admin~9373349858
                        </p>
                        <p>website's~4100-4500-3000</p>
                        </div>  
                    </div> 
                </div>
                {/*Copyright section*/}
                <div className='flex justify-between p-4 items-center'>
               <p> © 2024 DineWithUs TCJ. All rights reserved </p>
               <div className='flex items-center gap-6'>
                <a href='#'>Privacy Policy</a>
                <a href='#'>Terms & Conditions</a>
               </div>
                </div>
            
        </div>
    </div>
    </>
  );
};

export default Footer;