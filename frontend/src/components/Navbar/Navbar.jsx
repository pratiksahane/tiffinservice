import React from 'react';
import { FaCaretDown, FaUser, FaUtensils } from 'react-icons/fa';

const NavLinks = [
  {
    id: 1,
    name: 'Home',
    link: '/'
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
];

const DropdownLinks = [
  {
    id: 1,
    name: 'Vegetables',
    link: '/#'
  },
  {
    id: 2,
    name: 'Fruits',
    link: '/#'
  },
  {
    id: 3,
    name: 'Grains',
    link: '/#'
  },
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
                <a href={link} className='hidden sm:inline-block hover:text-primary text-xl font-semibold'>{name}</a>
              </li>
            ))}
            {/* Simple dropdown and links */}
            <li className='hidden md:block cursor-pointer group relative'>
              <div className='flex items-center gap-[2px] py-2'>
                <span className='inline-block hover:text-primary text-xl font-semibold'>
                  Dropdown
                </span>
                <FaCaretDown className='group-hover:rotate-180 duration-300' />
              </div>
              <div className='absolute left-0 z-[9999] hidden group-hover:block w-[200px] bg-white text-black shadow-md p-2'>
                <ul>
                  {DropdownLinks.map(({ id, name, link }) => (
                    <li key={id}>
                      <a href={link} className='inline-block w-full rounded-md p-2 hover:bg-primary/20 text-xl font-semibold'>
                        {name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            {/* Login button section */}
            <li>
              <button 
                onClick={HandlePopup} 
                className='flex justify-center gap-2 bg-secondary text-xl h-[40px] text-white px-2 md:px-5 py-2 hover:scale-105 duration-300'
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
