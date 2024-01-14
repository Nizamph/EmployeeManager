import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [isToken, setIsToken] = useState(localStorage.getItem('token'));
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    const id = setInterval(() => {
      setIsToken(localStorage.getItem('token'));
    }, 100);
    return () => {
      clearInterval(id);
    };
  }, []);
  console.log('token from header', isToken);
  return (
    <header className='bg-gradient-to-r fixed w-full from-blue-900 to-blue-950 p-4 z-10'>
      <div className='container mx-auto justify-start gap-96 flex items-center'>
        <div className='flex items-center'>
          <span className='text-white text-lg font-semibold'>
            Emploee Manager
          </span>
        </div>
        <nav className='hidden md:flex items-center space-x-6'>
          <Link
            to='/Home'
            className={`text-white ${
              location.pathname === '/Home' ? 'font-bold' : ''
            } hover:text-gray-300 transition duration-300`}>
            Home
          </Link>
          <Link
            to='/salaryList'
            className={`text-white ${
              location.pathname === '/salaryList' ? 'font-bold' : ''
            } hover:text-white transition duration-300`}>
            Salary List
          </Link>
        </nav>
        <div className='hidden md:flex items-center space-x-6'>
          <Link
            to='/'
            onClick={() => localStorage.clear('token')}
            className='text-white hover:text-gray-300 transition duration-300'>
            {isToken !== null ? 'logout' : 'login'}
          </Link>
        </div>

        <button
          onClick={toggleMenu}
          className='md:hidden text-white focus:outline-none'>
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h16m-7 6h7'></path>
          </svg>
        </button>
        {isMenuOpen && (
          <div className='md:hidden absolute top-16 right-0 bg-gradient-to-r from-blue-800 to-blue-500 p-4'>
            <Link
              to='/Home'
              className='block text-white mb-2 hover:text-gray-300 transition duration-300'>
              Home
            </Link>
            <Link
              to='/salaryList'
              className='block text-white hover:text-gray-300 transition duration-300'>
              Salary List
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
