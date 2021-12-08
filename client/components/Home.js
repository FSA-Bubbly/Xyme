import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Landing from "./Landing";
import { fetchWallet } from "../store/wallet";
import { fetchInteractions } from "../store/interactions";
import { fetchUpdateUser } from "../store/user";

export const Home = () => {
  const { auth, user } = useSelector((s) => s);
  const dispatch = useDispatch();

  const isLoggedIn = !!auth.id;

  useEffect(() => {
    dispatch(fetchWallet(auth));
    dispatch(fetchInteractions(auth));
    dispatch(fetchUpdateUser(auth.id));
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <div className='home'>
          <h2 className='mt-20 tracking-widest self font-sans uppercase fadeIn p-2 md:text-2xl  text-xl text-center text-gray-800 dark:text-gray-200 text-gray-800  '>
            Welcome, {user.firstName}!
          </h2>
          <div className='flex items-center justify-center pt-10 flex-col'>
            <Link to='/profile'>
              <h1 className='self font-sans uppercase fadeIn p-2 md:text-2xl  text-xl tracking-wider tracking-widest font-light text-center text-gray-800 dark:text-gray-200 text-gray-800'></h1>
              <img
                src={user.avatar}
                alt='Avatar'
                className=' w-32 transform transition duration-500 hover:scale-125'
              />
            </Link>
          </div>

          <div className='container mx-auto px-6 py-20'>
            <div className='flex flex-wrap'>
              <div className='w-full md:w-1/3 px-2 mb-4'>
                <Link to='/dailypill'>
                  <div className=' flex flex-col rounded py-2'>
                    <h1 className='self font-sans uppercase fadeIn p-2 md:text-xl  text-md tracking-widest font-normal text-center text-gray-800 dark:text-gray-200 text-gray-800'>
                      medication tracker
                    </h1>
                    <img
                      className=' m-5 transform transition duration-500 hover:scale-125 self-center object-scale-down w-16 sm:w-20 md:w-20 lg:w-20 xl:w-20'
                      src='/pill2.svg'
                      alt='Monitoring'
                    />
                  </div>
                </Link>
              </div>

              <div className='w-full md:w-1/3 px-2 mb-4'>
                <Link to='/wallet'>
                  <div className=' flex flex-col rounded py-2'>
                    <h1 className='self font-sans uppercase fadeIn p-2 md:text-xl  text-md tracking-widest  text-center text-gray-800 dark:text-gray-200 text-gray-800 font-normal'>
                      my wallet
                    </h1>

                    <img
                      src='/wallet.svg'
                      alt='Monitoring'
                      className=' m-5 transform transition duration-500 hover:scale-125 self-center object-scale-down w-16 sm:w-20 md:w-20 lg:w-20 xl:w-20'
                    />
                  </div>
                </Link>
              </div>

              <div className='w-full md:w-1/3 px-2 mb-4'>
                <Link to='/interactions'>
                  <div className=' flex flex-col rounded py-2'>
                    <h1 className='self font-sans uppercase fadeIn p-2 md:text-xl  text-md tracking-widest font-normal text-center text-gray-800 dark:text-gray-200 text-gray-800'>
                      interactions
                    </h1>
                    <img
                      className=' m-5 transform transition duration-500 hover:scale-125 self-center object-scale-down w-16 sm:w-20 md:w-20 lg:w-20 xl:w-20'
                      src='/pills-1.svg'
                      alt='Monitoring'
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Landing />
      )}
    </div>
  );
};

export default Home;
