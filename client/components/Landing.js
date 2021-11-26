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
      <div className='rounded-lg overflow-auto container bg-nude pt-24 md:pt-48 px-6 mx-auto flex flex-wrap flex-col md:flex-row items-center'>
        <div className='flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden'>
          <div className=' self-center w-1/2 p-8 sm:p-20 md:p-30'>
            <img src='/XYME.png' alt='Syncing' />
          </div>
          <h1 className='  h-full my-4 text-lg md:text-5xl text-black font-bold leading-tight text-center md:text-left slide-in-bottom-h1'>
            XYME
          </h1>
          <p className='leading-normal text-base md:text-2xl mb-8 text-center md:text-left slide-in-bottom-subtitle '>
            Your personalized medication and supplementation tracker.
          </p>
        </div>
        <button className='bg-white font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider justify-center'>
          <Link to='/login' className='navlink btn btn-one'>
            login
          </Link>
        </button>
        <section className=' mt-20 bg-nude  container mx-auto px-6 p-10 rounded-t'>
          <h2 className='  p-2 md:text-3xl  pt-5 md:pt-28 text-2xl font-bold text-center text-gray-800 mb-8 b'>
            Features
          </h2>

          <div className='flex items-center flex-wrap mb-20 border-t-2 border-black'>
            <div className='w-full md:w-1/2'>
              <h4 className='mt-20 text-lg md:text-3xl font-bold leading-tight  md:text-left text-gray-800 mb-8'>
                Check interactions
              </h4>
              <p className='text-gray-600 mb-8'>
                Use xyme to scan your pills to a free hour, when our power of
                choice is untrammelled and when nothing prevents our being able
                to do what we like best, every pleasure is to be welcomed and
                every pain avoided.
              </p>
            </div>
            <div className='w-full md:w-1/2 p-10 sm:p-20 md:p-30 '>
              <img src='/dots.svg' alt='Monitoring' />
            </div>
          </div>

          <div className='flex items-center flex-wrap mb-20'>
            <div className='w-full md:w-1/2 p-10 sm:p-20 md:p-30'>
              <img src='/pill.svg' alt='Reporting' />
            </div>
            <div className='w-full md:w-1/2 '>
              <h4 className='text-lg md:text-3xl font-bold leading-tight  md:text-left text-gray-800 mb-8'>
                Manage your pills
              </h4>
              <p className='text-gray-600 mb-8'>
                Our certain circumstances and owing to the claims of duty or the
                obligations of business it will frequently occur that pleasures
                have to be repudiated and annoyances accepted.
              </p>
            </div>
          </div>

          <div className='flex items-center flex-wrap mb-20 border-b-4 border-nude'>
            <div className='w-full md:w-1/2 '>
              <h4 className='text-lg md:text-3xl font-bold leading-tight  md:text-left text-gray-800 mb-8'>
                Scan your pills
              </h4>
              <p className='text-gray-600 mb-8'>
                Our Smart Health Monitoring Wristwatch allows you to sync data
                across all your mobile devices circumstances and owing to the
                claims of duty or the obligations of business it will frequently
                occur that pleasures have to be repudiated and annoyances
                accepted.
              </p>
            </div>
            <div className='w-full md:w-1/2 p-10 sm:p-20 md:p-30'>
              <img src='/pill.svg' alt='Syncing' />
            </div>
          </div>
        </section>

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
