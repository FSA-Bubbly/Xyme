import React, { useState } from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

export function SideMenu({ handleClick, isLoggedIn }) {
  const hide = () => {
    const menu = document.querySelector(".mobile-menus");
    menu.classList.toggle("hidden");
  };

  return (
    <div>

      {isLoggedIn ? (
        <div className='mobile-menus left-0 fixed h-screen w-full sm:w-1/4 lg:hidden bg-white top-16 z-30'>
          <ul className='menu-list flex flex-col text-xs font-bold'>
            <li className='menu-list-item py-2 hover:bg-white hover:text-blue-700'>
              {" "}
              <Link
                to='/wallet'
                className='text-center w-30 block py-2 px-4 text-sm hover:bg-gray-200'
                onClick={hide}
              >
                wallet
              </Link>
            </li>
            <li className='menu-list-item py-2 hover:bg-white hover:text-blue-700'>
              {" "}
              <Link
                to='/'
                className='text-center w-30 block ml-30  py-2 px-4 text-sm'
                onClick={hide}
              >
                home
              </Link>
            </li>
            <li className='menu-list-item py-2 hover:bg-white hover:text-blue-700'>
              {" "}
              <Link
                to='/profile'
                className='text-center w-30 block ml-30  py-2 px-4 text-sm'
                onClick={hide}
              >
                profile
              </Link>
            </li>
            <li className='menu-list-item py-2 hover:bg-white hover:text-blue-700'>
              {" "}
              <Link
                to='/conflicts'
                className='text-center w-30 block ml-30  py-2 px-4 text-sm'
                onClick={hide}
              >
                conflicts
              </Link>
            </li>
            <li className='menu-list-item py-2 hover:bg-white hover:text-blue-700'>
              {" "}
              <Link
                to='/'
                className='text-center w-30 block ml-30  py-2 px-4 text-sm'
                onClick={handleClick}
              >
                log out
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <div className='mobile-menus left-0 fixed h-screen w-full sm:w-1/4 lg:hidden bg-white top-16 z-30'>
          <ul className='menu-list flex flex-col text-xs font-bold'>
            <li className='menu-list-item py-2 hover:bg-white hover:text-blue-700'>
              {" "}
              <Link
                to='/signup'
                className='text-center w-30 block py-2 px-4 text-sm hover:bg-gray-200'
                onClick={hide}
              >
                sign up
              </Link>
            </li>
            <li className='menu-list-item py-2 hover:bg-white hover:text-blue-700'>
              {" "}
              <Link
                to='/login'
                className='text-center w-30 block ml-30  py-2 px-4 text-sm'
                onClick={hide}
              >
                log in
              </Link>
            </li>
          </ul>
        </div>
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
