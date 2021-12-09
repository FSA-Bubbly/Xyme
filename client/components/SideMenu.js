import React, { useState } from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { animated } from "react-spring";
import { motion } from "framer-motion";

export function SideMenu({ handleClick, isLoggedIn, style }) {
  const hide = () => {
    const menu = document.querySelector(".mobile-menus");
    menu.classList.toggle("hidden");
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className='menu menu--right ' style={style}>
          <nav className=' md:hidden menu-list menu-list--right'></nav>
          <div
            className='mobile-menus right-0  h-auto rounded-l fixed h-screen w-full sm:w-full lg:hidden bg-white top-16 z-30'
            style={style}
          >
            <ul className='divide-y divide-light-blue-400 menu-list flex flex-col text-xs font-bold'>
              <li className='flex menu-list-item py-2 hover:bg-white hover:text-orange dark:text-gray-400'>
                {" "}
                <img
                  src='/dailypills.svg'
                  alt='Monitoring'
                  className=' mx-4 w-6 self-center transform transition duration-500 hover:scale-125'
                />
                <Link
                  to='/dailypill'
                  className=' font-light tracking-wider text-center w-30 block py-2 px-4  hover:text-orange text-sm hover:text-orange'
                  onClick={hide}
                >
                  daily pills
                </Link>
              </li>
              <li className='flex menu-list-item py-2 hover:bg-white hover:text-orange hover:text-orange dark:text-gray-400'>
                {" "}
                <img
                  src='/walleticon.svg'
                  alt='Monitoring'
                  className=' mx-4 w-6 self-center transform transition duration-500 hover:scale-125'
                />
                <Link
                  to='/wallet'
                  className=' font-light tracking-wider text-center w-30 block py-2 px-4 text-sm hover:text-orange'
                  onClick={hide}
                >
                  wallet
                </Link>
              </li>

              <li className=' flex menu-list-item py-2 hover:bg-white hover:text-orange hover:text-orange dark:text-gray-400'>
                {" "}
                <img
                  src='/interactionsicon.svg'
                  alt='Monitoring'
                  className=' mx-4 w-6 self-center transform transition duration-500 hover:scale-125'
                />
                <Link
                  to='/interactions'
                  className=' font-light tracking-wider text-center w-30 block ml-30  py-2 px-4 text-sm hover:text-orange'
                  onClick={hide}
                >
                  interactions
                </Link>
              </li>

              <li className=' flex menu-list-item py-2 hover:bg-white hover:text-orange dark:text-gray-400'>
                {" "}
                <img
                  src='/profile.svg'
                  alt='Monitoring'
                  className=' mx-4 w-6 self-center transform transition duration-500 hover:scale-125'
                />
                <Link
                  to='/profile'
                  className=' font-light tracking-wider text-center w-30 block ml-30  py-2 px-4 text-sm hover:text-orange'
                  onClick={hide}
                >
                  profile
                </Link>
              </li>
              <li className=' flex flex-row menu-list-item py-2 hover:bg-white hover:text-orange  dark:text-gray-400'>
                {" "}
                <img
                  src='/homeicon.svg'
                  alt='Monitoring'
                  className=' mx-4 w-6 self-center transform transition duration-500 hover:scale-125'
                />
                <Link
                  to='/'
                  className=' font-light tracking-wider text-center w-30 block ml-30  py-2 px-4 text-sm hover:text-orange'
                  onClick={hide}
                >
                  home
                </Link>
              </li>
              <li className=' flex flex-row menu-list-item py-2 hover:bg-white hover:text-orange  dark:text  dark:text-gray-400'>
                {" "}
                <img
                  src='/settings.svg'
                  alt='Monitoring'
                  className=' mx-4 w-6 self-center transform transition duration-500 hover:scale-125'
                />
                <Link
                  to='/settings'
                  className='  font-light tracking-wider text-center w-30 block ml-30  py-2 px-4 text-sm hover:text-orange'
                  onClick={hide}
                >
                  settings
                </Link>
              </li>
              <li className=' flex menu-list-item py-2 hover:bg-white hover:text-orange  dark:text-gray-400'>
                {" "}
                <img
                  src='/logout.svg'
                  alt='Monitoring'
                  className='  mx-4 w-6 self-center transform transition duration-500 hover:scale-125'
                />
                <Link
                  to='/'
                  className=' font-light tracking-wider text-center w-30 block ml-30  py-2 px-4 text-sm hover:text-orange'
                  onClick={handleClick}
                >
                  log out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <motion.div
          transition={{ duration: 1.0, ease: [0.04, 0.62, 0.23, 0.98] }}
          className='mobile-menus right-0  h-auto rounded-l fixed h-screen w-full sm:w-1/2 lg:hidden bg-white top-16 z-30'
        >
          <ul className='divide-y divide-light-blue-400 menu-list flex flex-col text-xs font-bold'>
            <li className='flex menu-list-item py-2 hover:bg-white hover:text-orange dark:text-gray-400'>
              {" "}
              <img
                src='/logout.svg'
                alt='Monitoring'
                className=' mx-4 w-6 self-center transform transition duration-500 hover:scale-125'
              />
              <Link
                to='/signup'
                className=' font-light tracking-wider text-center w-30 block py-2 px-4 text-sm '
                onClick={hide}
              >
                sign up
              </Link>
            </li>
            <li className='flex menu-list-item py-2 hover:bg-white hover:text-orange dark:text-gray-400'>
              {" "}
              <img
                src='/logout.svg'
                alt='Monitoring'
                className=' mx-4 w-6 self-center transform transition duration-500 hover:scale-125'
              />
              <Link
                to='/login'
                className='font-light tracking-wider w-30 block ml-30  py-2 px-4 text-sm'
                onClick={hide}
              >
                log in
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </div>
  );
}

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

export default connect(mapState, mapDispatch)(SideMenu);
