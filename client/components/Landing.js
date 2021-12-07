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

export const Landing = ({ isLoggedIn }) => {
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
      <div className='rounded-lg justify-center overflow-auto container pt-15 md:pt-48 px-6 mx-auto flex flex-wrap flex-col md:flex-row items-center xl:mt-20 xl:pt-0'>
        <div className='flex flex-col w-1/2 xl:w-full self-center lg:items-start overflow-y-hidden lg:self-center'>
          <div className='self-center xs:mt- p-10 sm:p-20 md:p-20  xl:pt-0  '>
            <img
              className=' animate-bounce object-scale-down img rounded-full shadow-sm bg-nude'
              src='/XYME.png'
              alt='Syncing'
            />
          </div>
          <h1 className='self-center font-mont h-full my-5 text-3xl md:text-5xl  font-bold leading-tight text-center md:text-center slide-in-bottom-h1 '>
            xyme
          </h1>
          <p className=' self-center mt-20 opacity-0 xl:opacity-1 leading-normal text-base md:text-2xl mb-8 text-center md:text-center slide-in-bottom-subtitle '>
            Your personalized medication and supplementation tracker.
          </p>
          {isLoggedIn ? (
            <Link
              to='/login'
              className='hidden m-8 self-center w-10 h-full text-3xl md:text-5xl text-black'
            >
              <img
                src='/starticon.svg'
                className='hidden m-8 self-center w-10 h-full text-3xl md:text-5xl text-black'
              ></img>
            </Link>
          ) : (
            <Link
              to='/login'
              className='m-8 self-center w-10 h-full text-3xl md:text-5xl '
            >
              <img src='/starticon.svg'></img>
            </Link>
          )}
        </div>

        <section
          ref={ref}
          className=' mt-20  bg-opacity-20 container mx-auto px-6 p-10 rounded-t'
        >
          <h2 className=' font-serif fadeIn p-2 md:text-3xl  pt-5 md:pt-28 text-2xl font-bold text-center text-gray-800 mb-8 b dark:text-gray-200'>
            Features
          </h2>

          <div className='flex items-center flex-wrap mb-20 border-t-2 border-black dark:border-t-1 dark:border-gray-200'>
            <motion.div
              ref={ref}
              animate={animation}
              className='w-full md:w-1/2'
            >
              <h4 className='fadeIn mt-20 text-lg md:text-3xl font-bold leading-tight  md:text-left text-gray-800 mb-8 dark:text-gray-400'>
                Check Interactions
              </h4>
              <p className=' fadeIn text-gray-600 mb-8'>
                Use xyme to read about vital drug interactions to understand
                which medications should not be taken together(US only).
              </p>
            </motion.div>
            <div className=' flex justify-center fadeIn w-full xs:w-1/2 md:w-1/2 p-10 sm:p-20 md:p-30 ml-30 '>
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
              <h4 className=' text-lg md:text-3xl font-bold leading-tight  md:text-left text-gray-800 mb-8 dark:text-gray-400'>
                Manage your Medication
              </h4>
              <p className='text-gray-600 mb-8'>
                Keeping track of all your meds can be difficult. Our user
                friendly app will kindly send you SMS notifcations straight to
                your phone morning and night. This way you never ever forget to
                take your daily pills .
              </p>
            </motion.div>
          </div>

          <div className='flex items-center flex-wrap mb-20 '>
            <motion.div
              ref={ref}
              animate={animation}
              className='w-full md:w-1/2 '
            >
              <h4 className='text-lg md:text-3xl font-bold leading-tight  md:text-left text-gray-800 mb-8 dark:text-gray-400'>
                Scan your pills
              </h4>
              <p className='text-gray-600 mb-8'>
                Simply take a photo of your pill bottle, and add your medication
                to your personal wallet.
              </p>
            </motion.div>
            <div className=' flex justify-center w-full md:w-1/2 p-10 sm:p-20 md:p-30'>
              <img src='/iphone.svg' alt='Syncing' />
            </div>
          </div>
        </section>
        <section className='bg-white bg-opacity-40 container my-20 p-10 rounded-lg '>
          <div className='container mx-auto px-6 py-20'>
            <p className=' font-sans fadeIn p-2 md:text-3xl text-2xl text-center text-gray-800 mb-8 b dark:text-gray-200'>
              Meet the Team
            </p>
            <div className='flex flex-wrap'>
              <div className='w-full md:w-1/4 px-2 mb-4'>
                <div className='  transform transition duration-500 hover:scale-125  flex flex-col rounded py-2'>
                  <a className=' self-center' href='https://github.com/zwardb'>
                    <img
                      src='/Zack.svg'
                      className=' self-center w-20 sm:w-32 md:w-32 lg:w-32 xl:w-32'
                    />
                  </a>

                  <p className=' self-center text-gray-500 text-xs md:text-sm px-6 dark:text-gray-200'>
                    Zack Ward
                  </p>
                </div>
              </div>

              <div className=' transform transition duration-500 hover:scale-125 w-full md:w-1/4 px-2 mb-4'>
                <div className=' flex flex-col rounded py-2'>
                  <a
                    className=' self-center'
                    href='https://github.com/jlaguio97'
                  >
                    <img
                      src='/Jordan.svg'
                      className=' self-center w-20 sm:w-32 md:w-32 lg:w-32 xl:w-32'
                    />
                  </a>
                  <p className=' self-center text-gray-500 text-xs md:text-sm px-6 dark:text-gray-200'>
                    Jordan Laguio
                  </p>
                </div>
              </div>
              <div className=' transform transition duration-500 hover:scale-125 w-full md:w-1/4 px-2 mb-4'>
                <div className=' flex flex-col rounded py-2'>
                  <a
                    className=' self-center'
                    href='https://github.com/yoshidasala'
                  >
                    <img
                      src='/Sala.svg'
                      className=' self-center w-20 sm:w-32 md:w-32 lg:w-32 xl:w-32'
                    />
                  </a>

                  <p className=' self-center text-gray-500 text-xs md:text-sm px-6 dark:text-gray-200'>
                    Sala Yoshida
                  </p>
                </div>
              </div>
              <div className=' transform transition duration-500 hover:scale-125 w-full md:w-1/4 px-2 mb-4'>
                <div className=' flex flex-col rounded py-2'>
                  <a
                    className=' self-center'
                    href='https://github.com/cjfung94'
                  >
                    <img
                      src='/CJ.svg'
                      className=' self-center w-20 sm:w-32 md:w-32 lg:w-32 xl:w-32'
                    />
                  </a>
                  <p className=' self-center text-gray-500 text-xs md:text-sm px-6 dark:text-gray-200'>
                    CJ Fung
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className=' border-t-2 border-black w-full pt-16 pb-6 text-sm text-center md:text-left fade-in dark:border-t-2 dark:border-gray-200'>
          <a
            className=' text-gray-500 no-underline hover:no-underline'
            href='#'
          >
            {" "}
            <p className='text-center text-xs'>
              This product uses publicly available data from the U.S. National
              Library of Medicine (NLM), National Institutes of Health,
              Department of Health and Human Services; NLM is not responsible
              for the product and does not endorse or recommend this or any
              other product.
            </p>
            <br />
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
