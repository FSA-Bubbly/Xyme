import React, { useRef } from "react";
import { connect } from "react-redux";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useIntersection } from "react-use";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";

/**
 * COMPONENT
 */

export const Landing = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
  });
  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start({
        opacity: 1,
        transition: {
          duration: 1.5,
        },
      });
    }
    if (!inView) {
      animation.start({
        opacity: 0,
      });
    }
  }, [inView]);

  return (
    <div className=' mx-auto '>
      <div className='rounded-lg overflow-auto container bg-nude pt-15 md:pt-48 px-6 mx-auto flex flex-wrap flex-col md:flex-row items-center'>
        <div className='flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden lg:self-center'>
          <div className='self-center w-1/2 p-10 sm:p-20 md:p-30 '>
            <motion.img
              className=' img rounded-full shadow-sm bg-nude'
              initial={{ y: -100 }}
              animate={{
                type: "bounce",
                duration: 8,
                y: 40,
                transitionDelay: 50,
              }}
              src='/XYME.png'
              alt='Syncing'
            />
          </div>
          <h1 className=' font-mont h-full my-5 text-3xl md:text-5xl text-black font-bold leading-tight text-center md:text-center slide-in-bottom-h1'>
            xyme
          </h1>
          <p className=' mt-10 opacity-0 xl:opacity-1 leading-normal text-base md:text-2xl mb-8 text-center md:text-left slide-in-bottom-subtitle '>
            Your personalized medication and supplementation tracker.
          </p>

          <Link
            to='/login'
            className='m-8 self-center w-10 h-full text-3xl md:text-5xl text-black'
          >
            <img src='/starticon.svg'></img>
          </Link>
        </div>

        <section
          ref={ref}
          className=' mt-20 bg-nude bg-opacity-20 container mx-auto px-6 p-10 rounded-t'
        >
          <h2 className=' font-serif fadeIn p-2 md:text-3xl  pt-5 md:pt-28 text-2xl font-bold text-center text-gray-800 mb-8 b'>
            Features
          </h2>

          <div className='flex items-center flex-wrap mb-20 border-t-2 border-black'>
            <motion.div
              ref={ref}
              animate={animation}
              className='w-full md:w-1/2'
            >
              <h4 className='fadeIn mt-20 text-lg md:text-3xl font-bold leading-tight  md:text-left text-gray-800 mb-8'>
                Check interactions
              </h4>
              <p className=' fadeIn text-gray-600 mb-8'>
                Use xyme to scan your pills to a free hour, when our power of
                choice is untrammelled and when nothing prevents our being able
                to do what we like best, every pleasure is to be welcomed and
                every pain avoided.
              </p>
            </motion.div>
            <div className=' flex justify-center fadeIn w-full md:w-1/2 p-10 sm:p-20 md:p-30 ml-30 '>
              <img src='/pills-1.svg' alt='Monitoring' />
            </div>
          </div>

          <div className='flex items-center flex-wrap mb-20'>
            <div className=' flex justify-center w-full md:w-1/2 p-10 sm:p-20 md:p-30'>
              <img src='/wallet.svg' alt='Reporting' />
            </div>
            <motion.div
              ref={ref}
              animate={animation}
              className='w-full md:w-1/2'
            >
              <h4 className='text-lg md:text-3xl font-bold leading-tight  md:text-left text-gray-800 mb-8'>
                Manage your pills
              </h4>
              <p className='text-gray-600 mb-8'>
                Our certain circumstances and owing to the claims of duty or the
                obligations of business it will frequently occur that pleasures
                have to be repudiated and annoyances accepted.
              </p>
            </motion.div>
          </div>

          <div className='flex items-center flex-wrap mb-20 border-b-4 border-nude'>
            <motion.div
              ref={ref}
              animate={animation}
              className='w-full md:w-1/2 '
            >
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
            </motion.div>
            <div className=' flex justify-center w-full md:w-1/2 p-10 sm:p-20 md:p-30'>
              <img src='/iphone.svg' alt='Syncing' />
            </div>
          </div>
        </section>
        <div className='flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden lg:self-center'>
          <div className='self-center w-1/2 p-10 sm:p-20 md:p-30 '>
            <img
              className=' img rounded-full shadow-sm bg-nude'
              animate={{ scale: 2 }}
              src='/XYME.png'
              alt='Syncing'
            />
          </div>
          <h1 className=' font-serif h-full my-4 text-3xl md:text-5xl text-black font-bold leading-tight text-center md:text-center slide-in-bottom-h1'>
            Xyme
          </h1>
        </div>
        <div className=' border-t-2 border-black w-full pt-16 pb-6 text-sm text-center md:text-left fade-in'>
          <a
            className=' text-gray-500 no-underline hover:no-underline'
            href='#'
          >
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
