import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

import { IconContext } from "react-icons/lib";

const Navbar = ({ handleClick, isLoggedIn }) => {
  const handleMenu = () => {
    const menu = document.querySelector(".mobile-menu");
    menu.classList.toggle("hidden");
  };
  return (
    <header>
      <div className='navbar'></div>
      {/* ---- if user is logged in ---- */}
      {isLoggedIn ? (
        <nav className='bg-nude-100 '>
          <div className='max-w-6xl mx-auto px-4'>
            <div className='flex justify-between'>
              <div className='flex space-x-4'>
                <Link to='/' className='font-bold block py-2 px-4 text-sm '>
                  xyme
                </Link>

                <div className='hidden md:flex items-center space-x-1'>
                  <Link
                    to='/'
                    className='py-5 px-3 text-orange hover:text-gray-900'
                  >
                    Home
                  </Link>
                  <a
                    href='#'
                    className='py-5 px-3 text-gray-700 hover:text-gray-900'
                  >
                    About
                  </a>
                </div>
              </div>

              <div className='hidden md:flex items-center space-x-1'>
                <Link
                  onClick={handleClick}
                  className='block py-2 px-4 text-sm hover:bg-green'
                  to='/'
                >
                  logout
                </Link>
              </div>
              {/* ---- mobile menu button ---- */}
              <div className='md:hidden flex items-center'>
                <button className='mobile-menu-button' onClick={handleMenu}>
                  <svg
                    className='w-6 h-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='orange'
                  >
                    <path
                      strokeLinecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/* ---- mobile menu ---- */}
          <div className='mobile-menu hidden md:hidden'>
            <Link
              to='/wallet'
              className='block py-2 px-4 text-sm hover:bg-green'
            >
              wallet
            </Link>

            <Link
              to='/profile'
              className='block py-2 px-4 text-sm hover:bg-green'
            >
              profile
            </Link>

            <Link to='/' className='block py-2 px-4 text-sm hover:bg-green'>
              home
            </Link>
            <Link
              onClick={handleClick}
              className='block py-2 px-4 text-sm hover:bg-green'
              to='/'
            >
              logout
            </Link>
          </div>
        </nav>
      ) : (
        <nav className='bg-nude-100'>
          {/* ---- if user is not logged in---- */}
          <div className='max-w-6xl mx-auto px-4'>
            <div className='flex justify-between'>
              <div className='flex space-x-4'>
                <div>
                  <Link to='/' className='font-bold block py-5 px-4 text-sm '>
                    zyme
                  </Link>
                </div>
                <div className='hidden md:flex items-center space-x-1'>
                  <Link
                    to='/'
                    className='py-5 px-3 text-black hover:text-gray-900'
                  >
                    Home
                  </Link>

                  <Link
                    to='/'
                    className='py-5 px-3 text-black hover:text-gray-900'
                  >
                    about
                  </Link>
                </div>
              </div>

              <div className='hidden md:flex items-center space-x-1 mr-0'>
                <button className='h-7 px-6 text-white transition-colors duration-150 bg-green rounded-full focus:shadow-outline hover:bg-green'>
                  {" "}
                  <Link className='navlink btn btn-one' to='/signup'>
                    sign up
                  </Link>
                </button>

                <button className='h-7 px-6 text-white transition-colors duration-150 bg-green rounded-full focus:shadow-outline hover:bg-green'>
                  {" "}
                  <Link className='navlink btn btn-one' to='/login'>
                    log in
                  </Link>
                </button>
              </div>
              {/* ---- mobile menu button ---- */}
              <div className='md:hidden flex items-center'>
                <button className='mobile-menu-button' onClick={handleMenu}>
                  <svg
                    className='w-6 h-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='orange'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/* ---- mobile menu ---- */}
          <div className='mobile-menu hidden md:hidden flex-col z-40 bg-yellow-100 w-40 align-end'>
            <Link
              to='/login'
              className='flex w-30 justify-end ml-30  py-2 px-4 text-sm hover:bg-gray-200'
            >
              log in
            </Link>

            <Link
              to='/signup'
              className=' flex w-30 justify-end block py-2 px-4 text-sm hover:bg-gray-200'
            >
              sign up
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
