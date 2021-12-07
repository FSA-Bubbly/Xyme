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
          <h2 className='font-serif p-2 md:text-3xl pt-5 md:pt-28 text-2xl font-bold text-center text-gray-800 mb-8 b dark:text-gray-200'>
            Welcome, {user.firstName}!
          </h2>
          <div className='flex items-center justify-center pt-10 flex-col'>
            <Link to='/profile'>
              <h1 className='self font-sans uppercase fadeIn p-2 md:text-2xl  text-xl tracking-wider text-center text-gray-800 dark:text-gray-200 text-gray-800'>
                profile
              </h1>
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
                    <h1 className='self font-sans uppercase fadeIn p-2 md:text-2xl  text-xl tracking-wider text-center text-gray-800 dark:text-gray-200 text-gray-800'>
                      medication tracker
                    </h1>
                    <img
                      className='  transform transition duration-500 hover:scale-125 self-center object-scale-down w-20 sm:w-32 md:w-32 lg:w-32 xl:w-32'
                      src='/pill2.svg'
                      alt='Monitoring'
                    />
                  </div>
                </Link>
              </div>

              <div className='w-full md:w-1/3 px-2 mb-4'>
                <Link to='/wallet'>
                  <div className=' flex flex-col rounded py-2'>
                    <h1 className='self font-sans uppercase fadeIn p-2 md:text-2xl  text-xl tracking-wider text-center text-gray-800 dark:text-gray-200 text-gray-800'>
                      my wallet
                    </h1>

                    <img
                      src='/wallet.svg'
                      alt='Monitoring'
                      className='  transform transition duration-500 hover:scale-125 self-center object-scale-down w-20 sm:w-32 md:w-32 lg:w-32 xl:w-32'
                    />
                  </div>
                </Link>
              </div>

              <div className='w-full md:w-1/3 px-2 mb-4'>
                <Link to='/interactions'>
                  <div className=' flex flex-col rounded py-2'>
                    <h1 className='self font-sans uppercase fadeIn p-2 md:text-2xl  text-xl tracking-wider text-center text-gray-800 dark:text-gray-200 text-gray-800'>
                      interactions
                    </h1>
                    <img
                      className=' transform transition duration-500 hover:scale-125 self-center object-scale-down w-20 sm:w-32 md:w-32 lg:w-32 xl:w-32'
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
