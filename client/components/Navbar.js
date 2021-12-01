import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { useSpring } from "react-spring";

import SideMenu from "./SideMenu";

export function Navbar({ handleClick, isLoggedIn }) {
  const [isSideMenuOpen, setisSideMenuOpen] = useState(false);

  const showSideMenu = () => {
    isSideMenuOpen ? setisSideMenuOpen(false) : setisSideMenuOpen(true);
  };

  return (
    <header className='navbar font-mont'>
      <div className='navbar font-mont'></div>
      {/* ---- if user is logged in ---- */}
      {isLoggedIn ? (
        <nav className='bg-nude'>
          <div className='max-w-6xl mx-auto px-4'>
            <div className='flex justify-between'>
              <div className='flex space-x-4'>
                <div>
                  <Link to='/' className='font-bold text-lg block py-5 px-4 '>
                    xyme
                  </Link>
                </div>
              </div>

              <div className='hidden md:flex items-center space-x-1 mr-0 hover:border-b-6 hover:border-orange'>
                <Link
                  to='/dailypill'
                  className='py-5 px-3 text-black hover:text-gray-900 u'
                >
                  daily pill
                </Link>
                <Link
                  to='/calendar'
                  className='py-5 px-3 text-black hover:text-gray-900 u'
                >
                  calendar
                </Link>
                <Link
                  to='/wallet'
                  className='py-5 px-3 text-black hover:text-gray-900 u'
                >
                  wallet
                </Link>
                <Link
                  to='/'
                  className='py-5 px-3 text-black hover:text-gray-900 hover:border-b-6 hover:border-orange'
                >
                  <i className='fa fa-home'></i>
                  home
                </Link>
                <Link
                  to='/profile'
                  className='py-5 px-3 text-black hover:text-gray-900 hover:border-b-6 hover:border-orange'
                >
                  profile
                </Link>
                <Link
                  to='/interactions'
                  className='py-5 px-3 text-black hover:text-gray-900 hover:border-b-6 hover:border-orange'
                >
                  interactions
                </Link>{" "}
                <Link
                  to='/'
                  className='py-5 px-3 text-black hover:text-gray-900 hover:border-b-6 hover:border-orange'
                  onClick={handleClick}
                >
                  log out
                </Link>
              </div>
              {/* ---- mobile menu button ---- */}
              <button
                onClick={() => {
                  showSideMenu();
                }}
                className='md:hidden lg:hidden menu-button fixed right-0 p-5'
              >
                <svg
                  className='w-8 h-6'
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
              {isSideMenuOpen ? <SideMenu /> : ""}
            </div>
          </div>
        </nav>
      ) : (
        <nav className='bg-nude'>
          {/* ---- if user is not logged in---- */}
          <div className='max-w-6xl mx-auto px-4'>
            <div className='flex justify-between'>
              <div className='flex space-x-4'>
                <div>
                  <Link to='/' className='font-bold block py-5 px-4 text-lg'>
                    xyme
                  </Link>
                </div>
              </div>

              <div className=' hover:border-b-6 hover:border-orange  hidden md:flex items-center space-x-2 mr-0'>
                <Link
                  to='/signup'
                  className=' hover:border-b-6 hover:border-orange border-green py-5 px-3 text-black hover:text-gray-900'
                >
                  sign up
                </Link>
                <Link
                  to='/'
                  className='py-5 px-3 text-black hover:text-gray-900'
                >
                  <i className='fa fa-home'></i>
                  home
                </Link>

                <Link
                  className='py-5 px-3 text-black hover:text-gray-900'
                  to='/login'
                >
                  log in
                </Link>
              </div>
              {/* ---- mobile menu button ---- */}
              <button
                onClick={() => {
                  showSideMenu();
                }}
                className='md:hidden lg:hidden menu-button fixed right-0 p-5'
              >
                <svg
                  className='w-8 h-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='black'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>
              {isSideMenuOpen ? <SideMenu /> : ""}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

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
