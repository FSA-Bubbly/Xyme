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
    <div>
      <div className='navbar'></div>

      {isLoggedIn ? (
        <nav class='bg-nude-100'>
          <div class='max-w-6xl mx-auto px-4'>
            <div class='flex justify-between'>
              <div class='flex space-x-4'>
                <div>
                  <a
                    href='#'
                    class='flex items-center py-5 px-2 text-gray-700 hover:text-gray-900'
                  >
                    <span class='font-bold'>zyme</span>
                  </a>
                </div>
                <div class='hidden md:flex items-center space-x-1'>
                  <a href='/' class='py-5 px-3 text-orange hover:text-gray-900'>
                    <Link to='/'>Home</Link>
                  </a>
                  <a
                    href='#'
                    class='py-5 px-3 text-gray-700 hover:text-gray-900'
                  >
                    About
                  </a>
                </div>
              </div>

              <div class='hidden md:flex items-center space-x-1'>
                <a href='' class='py-5 px-3'>
                  <Link className='navlink btn btn-one' to='/signup'>
                    SIGN UP
                  </Link>
                </a>
                <a
                  href=''
                  class='py-2 px-3 bg-grey-400 hover:bg-grey-300 text-orange hover:text-yellow-800 rounded transition duration-300'
                >
                  <Link className='navlink btn btn-one' to='/login'>
                    LOG IN
                  </Link>
                </a>
                <Link
                  onClick={handleClick}
                  class='block py-2 px-4 text-sm hover:bg-green'
                  to='/'
                >
                  logout
                </Link>
              </div>

              <div class='md:hidden flex items-center'>
                <button class='mobile-menu-button' onClick={handleMenu}>
                  <svg
                    class='w-6 h-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='orange'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class='mobile-menu hidden md:hidden'>
            <Link class='block py-2 px-4 text-sm hover:bg-green' to='/'>
              wallet
            </Link>

            <Link class='block py-2 px-4 text-sm hover:bg-green' to='/'>
              profile
            </Link>

            <Link class='block py-2 px-4 text-sm hover:bg-green' to='/'>
              home
            </Link>
            <Link
              onClick={handleClick}
              class='block py-2 px-4 text-sm hover:bg-green'
              to='/'
            >
              logout
            </Link>
          </div>
        </nav>
      ) : (
        <nav class='bg-nude-100'>
          <div class='max-w-6xl mx-auto px-4'>
            <div class='flex justify-between'>
              <div class='flex space-x-4'>
                <div>
                  <a
                    href='#'
                    class='flex items-center py-5 px-2 text-gray-700 hover:text-gray-900'
                  >
                    <span class='font-bold'>zyme</span>
                  </a>
                </div>
                <div class='hidden md:flex items-center space-x-1'>
                  <a href='/' class='py-5 px-3 text-black hover:text-gray-900'>
                    <Link to='/'>Home</Link>
                  </a>
                  <a
                    href='#'
                    class='py-5 px-3 text-gray-700 hover:text-gray-900'
                  >
                    About
                  </a>
                </div>
              </div>

              <div class='hidden md:flex items-center space-x-1'>
                <a href='' class='py-5 px-3'>
                  <Link className='navlink btn btn-one' to='/signup'>
                    SIGN UP
                  </Link>
                </a>
                <a
                  href=''
                  class='py-2 px-3 bg-grey-400 hover:bg-grey-300 text-black hover:text-yellow-800 rounded transition duration-300'
                >
                  <Link className='navlink btn btn-one' to='/login'>
                    LOG IN
                  </Link>
                </a>
              </div>

              <div class='md:hidden flex items-center'>
                <button class='mobile-menu-button' onClick={handleMenu}>
                  <svg
                    class='w-6 h-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='orange'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class='mobile-menu hidden md:hidden'>
            <a href='/' class='block py-2 px-4 text-sm hover:bg-gray-200'>
              <Link className='navlink btn btn-one' to='/login'>
                LOG IN
              </Link>
            </a>
            <a href='/' class='block py-2 px-4 text-sm hover:bg-gray-200'>
              <Link className='navlink btn btn-one' to='/signup'>
                SIGN UP
              </Link>
            </a>
          </div>
        </nav>
      )}
    </div>
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
