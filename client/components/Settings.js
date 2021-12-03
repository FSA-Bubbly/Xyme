import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateUser } from "../store/user";
import history from "../history";
import { Link } from "react-router-dom";

const Settings = () => {
  const user = useSelector((state) => state.auth);
  const updatedUser = useSelector((state) => state.user);
  const checkbox = document.getElementsByClassName("checkbox");
  const html = document.querySelector("html");

  const toggleDarkMode = function () {
    checkbox[0].checked
      ? html.classList.add("dark")
      : html.classList.remove("dark");
  };

  // toggleDarkMode();

  return (
    <div>
      <div className='flex flex-col'>
        {/* <p>Password: {user.password}</p> need to solve this */}
        <div className='flex self-center fadeIn w-full sm:full md:w-full p-20 sm:p-20 md:p-20 overflow-scroll '>
          <h1 className=' w-full self-center font-sans uppercase fadeIn p-2 md:text-2xl text-xl font-bold text-center text-gray-800 '>
            Settings
          </h1>

          <div></div>
        </div>
        <div className='flex items-center justify-center'>
          <div className='bg-white w-full  xs:1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 mt-10 rounded-lg dark:bg-gray-200'>
            <div className='flex items-center justify-center pt-10 flex-col'>
              <img src={updatedUser.avatar} className=' w-32' />
              <h1 className='text-gray-800 font-semibold text-xl mt-5'>
                {updatedUser.firstName} {updatedUser.lastName}
              </h1>
              <h1 className='text-gray-500 text-sm'></h1>
              <h1 className='text-gray-500 text-sm p-4 text-left'></h1>
              <div>
                {/*  this is the light dark theme/*/}
                <input
                  type='checkbox'
                  name=''
                  id='checkbox'
                  className='checkbox hidden'
                  onClick={toggleDarkMode}
                />
                <label htmlFor='checkbox' className='cursor-pointer'>
                  <div className='w-11 h-4 flex items-center bg-gray-300 rounded-full p2 dark:bg-gray-300'>
                    <div className='switch-ball w-5 h-4 bg-white dark:bg-gray-500 rounded-full shadow'></div>
                  </div>
                </label>
              </div>
            </div>
            <div className='flex justify-center p-4'>
              <div>
                <Link
                  to={`/profile/edit`}
                  className='text-xs text-green-300 border-2 py-1 px-2 border-green-300'
                >
                  Edit Profile
                </Link>
              </div>
            </div>
            <div className='flex items-center justify-center mt-3 mb-6 flex-col'>
              <h1 className='text-xs text-gray-500'>...</h1>
              <div className='flex mt-2'>
                <hr></hr>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
