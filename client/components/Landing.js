import React, { useRef } from "react";
import { connect } from "react-redux";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
export const Landing = () => {
  return (
    <div>
      <div className='container pt-24 md:pt-48 px-6 mx-auto flex flex-wrap flex-col md:flex-row items-center'>
        <div className='flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden'>
          <h1 className='my-4 text-xl md:text-5xl text-black font-bold leading-tight text-center md:text-left slide-in-bottom-h1'>
            Welcome to Xyme! Your personalized medication and supplementation
            tracker.
          </h1>
          <p className='leading-normal text-base md:text-2xl mb-8 text-center md:text-left slide-in-bottom-subtitle'>
            Subhero message
          </p>
          <button className='h-7 px-6 text-white transition-colors duration-150 bg-green rounded-full focus:shadow-outline hover:bg-green center'>
            {" "}
            <Link className='navlink btn btn-one' to='/login'>
              login
            </Link>
          </button>
        </div>

        {/* <div className='w-full xl:w-3/5 py-6 overflow-y-hidden'>
          <img
            className='w-5/6 mx-auto lg:mr-0 slide-in-bottom'
            src='devices.svg'
          />
        </div> */}

        <div className='w-full pt-16 pb-6 text-sm text-center md:text-left fade-in'>
          <a className='text-gray-500 no-underline hover:no-underline' href='#'>
            &copy; xyme
          </a>
        </div>
      </div>
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

export default connect(mapState, null)(Landing);
