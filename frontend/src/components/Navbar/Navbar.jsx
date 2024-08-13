import React from 'react';
import { FaCaretDown, FaUser, FaUtensils } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const NavLinks = [
  {
    id: 1,
    name: 'Home',
    link: '/home'
  },
  {
    id: 2,
    name: 'About',
    link: '/about'
  },
  {
    id: 3,
    name: 'Contact',
    link: '/contact'
  },
  {
    id: 4,
    name: 'Blogs',
    link: '/blog'
  }
];

const Navbar = ({ HandlePopup, HandlePopup1 }) => {
  return (
    <div data-aos="fade" className='bg-white shadow-md'>
      <div className='container flex justify-between py-4 sm:py-3'>
        {/* Logo section */}
        <div className="flex items-center space-x-2 font-bold text-3xl group">
          <FaUtensils className='text-3xl group-hover:text-pink-500 duration-200' />
          <span className='group-hover:text-pink-500'>Dine With Us</span>
        </div>
        {/* Nav links section */}
        <div>
          <ul className='flex items-center gap-10'>
            {NavLinks.map(({ id, name, link }) => (
              <li key={id}>
                <Link to={link} className='hidden sm:inline-block hover:text-primary text-xl font-semibold'>
                  {name}
                </Link>
              </li>
            ))}
            {/* Login button section */}
            <li>
              <button 
                onClick={HandlePopup} 
                className='flex justify-center gap-2 bg-secondary text-xl h-[40px] text-white px-2 md:px-5 py-2 hover:scale-105 duration-300 hover:bg-secondary'
                aria-label="My Account"
              >
                <FaUser />
                My Account
              </button>
            </li>
            {/* Sign-up link section */}
            <li>
              <a 
                href="#"
                onClick={(e) => { 
                  e.preventDefault(); 
                  HandlePopup1(); 
                }} 
                className='hidden sm:inline-block hover:text-primary text-xl font-semibold'
              >
                or sign-up
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
