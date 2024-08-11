import React from 'react'
import polygon from "../../assets/polygon.png"
import Wave from "../../assets/Wave.png"
import { FaUser } from 'react-icons/fa';

const bgStyle ={
    backgroundImage: `url(${polygon})`,
    backgroundRepeat: "no-repeat",
    backgroundPositiion: "center",
    backgroundSize: "cover",
    width: "100%",
    height: "100%",
    position: "relative",
};
const About = ({HandlePopup}) => {
  return (
    <>
    <div style={bgStyle} className='py-14'>
        <div className='container min-[500px] relative z-10'>
            <h1 data-aos="fade" className='pt-20 tracking-wider text-4xl font-semibold text-dark text-center'>
                About US
            </h1>
            {/*Card Section */}
            <div data-aos="fade" data-aos-delay="300" className='bg-white/80 p-10 my-10'>
              <p>Welcome to Dine with Us—Where Every Meal Feels Like Home!
At Dine with Us we believe that good food brings people together. Founded with a passion for delicious, homemade meals, our mission is to provide you with a convenient, healthy, and satisfying dining experience right at your doorstep.
<br/> Our Story: Born out of a love for cooking and a desire to make everyday dining effortless, we started Dine with Us to bridge the gap between busy lifestyles and wholesome, home-cooked meals. With skilled chefs and dedicated food enthusiasts, we craft each tiffin with fresh, locally-sourced ingredients, ensuring that every bite is as nourishing as it is flavorful.
 </p> 
            <div className='pt-10 flex justify-center'>
            <button onClick={HandlePopup} className='flex justify-center gap-2 bg-primary text-xl h-[40px] text-white px-5 py-2 hover:scale-105 duration-300'>
                <FaUser />
                My Account
              </button>
            </div>
            </div>
        </div>
        {/*Wave Vector */}
        <div className='absolute top-0 right-0 w-full'>
            <img src={Wave} alt="" className='mx-auto'  />
        </div>
    </div>
    </>
  )
};

export default About;