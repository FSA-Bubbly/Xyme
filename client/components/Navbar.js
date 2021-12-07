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
    <header className='  navbar font-mont'>
      <div className='navbar font-mont'></div>
      {/* ---- if user is logged in ---- */}
      {isLoggedIn ? (
        <nav className=''>
          <div className=' mx-auto px-4 py-4'>
            <div className='flex justify-between'>
              <div className='flex space-x-4 mt-4'>
                <div>
                  <Link
                    to='/'
                    className=' self font-sans  fadeIn p-2 md:text-2xl  text-xl text-center text-gray-800 dark:text-gray-200 text-gray-800  tracking-wider'
                  >
                    xyme
                  </Link>
                </div>
              </div>

              <div className='flex hidden md:flex items-center space-x-3 mr-0 hover:border-b-6 hover:border-orange'>
                <Link
                  to='/dailypill'
                  className=' flex flex-col px-1 text-xs text-gray-500 uppercase dark:text-gray-400'
                >
                  daily pills
                  <img
                    src='/dailypills.svg'
                    className=' mb-1 w-6 self-center transform transition duration-500 hover:scale-125'
                  />
                </Link>
                <Link
                  to='/wallet'
                  className=' flex flex-col px-1 text-xs text-gray-500 uppercase dark:text-gray-400  '
                >
                  wallet
                  <img
                    src='/walleticon.svg'
                    className=' mb-1 w-6 self-center transform transition duration-500 hover:scale-125'
                  />
                </Link>
                <Link
                  to='/profile'
                  className=' flex flex-col px-1 text-xs text-gray-500 uppercase dark:text-gray-400'
                >
                  profile
                  <img
                    src='/profile.svg'
                    className=' mb-1 w-6 self-center transform transition duration-500 hover:scale-125'
                  />
                </Link>
                <Link
                  to='/interactions'
                  className=' flex flex-col px-1 text-xs text-gray-500 uppercase dark:text-gray-400'
                >
                  interactions
                  <img
                    src='/interactionsicon.svg'
                    className=' mb-1 w-6 self-center transform transition duration-500 hover:scale-125'
                  />
                </Link>{" "}
                <Link
                  to='/'
                  className=' flex flex-col px-1 text-xs text-gray-500 uppercase dark:text-gray-400'
                >
                  home
                  <img
                    src='/homeicon.svg'
                    className=' mb-1 w-6 self-center transform transition duration-500 hover:scale-125'
                  />
                </Link>
                <Link
                  to='/settings'
                  className=' flex flex-col px-1 text-xs text-gray-500 uppercase dark:text-gray-400'
                >
                  settings
                  <img
                    src='/settings.svg'
                    className=' mb-1 w-6 self-center transform transition duration-500 hover:scale-125'
                  />
                </Link>
                <Link
                  to='/'
                  className=' flex flex-col px-1 text-xs text-gray-500 uppercase dark:text-gray-400 '
                  onClick={handleClick}
                >
                  log out
                  <img
                    src='/logout.svg'
                    alt='Monitoring'
                    className=' mb-1 w-6 self-center transform transition duration-500 hover:scale-125'
                  />
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
        <nav className=''>
          {/* ---- if user is not logged in---- */}
          <div className='max-w-6xl mx-auto px-4 py-4'>
            <div className='flex justify-between'>
              <div className='flex space-x-4'>
                <div>
                  <Link
                    to='/'
                    className=' self font-sans  fadeIn p-2 md:text-2xl  text-xl text-center text-gray-800 dark:text-gray-200 text-gray-800  tracking-wider'
                  >
                    xyme
                  </Link>
                </div>
              </div>

              <div className=' hover:border-b-6 hover:border-orange  hidden md:flex items-center space-x-2 mr-0'>
                <Link
                  to='/signup'
                  className=' p-20 flex flex-col px-1 text-xs text-gray-500 uppercase rounded-full  self-center text-xs text-green-300  py-1 px-2 border-gray-500 dark:text-gray-500 dark:border-gray-300 hover:bg-orange hover:border-orange hover:text-white text-gray-800'
                >
                  sign up
                </Link>

                <Link
                  className=' p-20 flex flex-col px-1 text-xs text-gray-500 uppercase rounded-full  self-center text-xs text-green-300  py-1 px-2 border-gray-500 dark:text-gray-500 dark:border-gray-300 hover:bg-orange hover:border-orange hover:text-white text-gray-800'
                  to='/login'
                >
                  log in
                </Link>
                <Link
                  to='/'
                  className=' flex flex-col px-1 text-xs text-gray-500 uppercase'
                >
                  <img
                    src='/homeicon.svg'
                    alt='Monitoring'
                    className=' mb-1 w-6 self-center'
                  />
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
