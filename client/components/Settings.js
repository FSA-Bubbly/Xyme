import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSms, fetchUpdateUser } from "../store/user";
import history from "../history";
import { Link } from "react-router-dom";

const Settings = () => {
  const user = useSelector((state) => state.auth);
  const updatedUser = useSelector((state) => state.user);
  const checkbox = document.getElementsByClassName("checkbox");
  const theme = window.localStorage.getItem("theme");
  const html = document.querySelector("html");
  const dispatch = useDispatch();

  useEffect(() => {
    const theme = window.localStorage.getItem("theme");
    if (theme === "dark") {
      checkbox[0].checked = true;
    } else {
      checkbox[0].checked = false;
    }
  }, [theme]);

  useEffect(() => {
    if (user.sms) {
      console.log("user sms is true");
      const notif = document.getElementsByClassName("notification");
      notif[0].checked = true;
    } else {
      console.log("user sms is false");
      const notif = document.getElementsByClassName("notification");
      notif[0].checked = false;
    }
  }, [user]);

  const toggleDarkMode = function () {
    if (checkbox[0].checked) {
      window.localStorage.setItem("theme", "dark");
      const theme = window.localStorage.getItem("theme");
      html.classList.add("dark");
      const switchball = document.getElementsByClassName("switch-ball");
    } else {
      window.localStorage.setItem("theme", "light");
      const theme = window.localStorage.getItem("theme");
      html.classList.remove("dark");
      console.log(theme);
    }
  };

  const toggleNotification = function () {
    const notif = document.getElementsByClassName("notification");
    const statusObj = {
      status: notif[0].checked,
      userId: user.id,
    };
    dispatch(updateSms(statusObj));
  };

  return (
    <div>
      <div className='flex flex-col'>
        {/* <p>Password: {user.password}</p> need to solve this */}
        <div className='flex self-center fadeIn w-full sm:full md:w-full p-20 sm:p-20 md:p-20 overflow-scroll '>
          <h1 className=' w-full self-center font-sans uppercase fadeIn p-2 md:text-2xl text-xl tracking-wider text-center dark:text-gray-200 text-gray-800 '>
            Settings
          </h1>

          <div></div>
        </div>
        <div className='flex items-center justify-center'>
          <div className='bg-white w-full  xs:1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 mt-10 rounded-lg dark:bg-gray-200'>
            <div className='flex items-center justify-center pt-10 flex-col'>
              <h1 className='text-gray-500 text-sm'>Theme</h1>
              <div className='flex flex-col'>
                {/*  this is the light dark theme/*/}
                <input
                  type='checkbox'
                  name=''
                  id='checkbox'
                  className='checkbox hidden'
                  onClick={toggleDarkMode}
                />
                <label htmlFor='checkbox' className='cursor-pointer flex py-5'>
                  <div className='text-xs text-gray-500 uppercase dark:text-gray-400 mx-2'>
                    light
                  </div>
                  <div className='w-11 h-4 flex items-center bg-gray-300 rounded-full p2 dark:bg-gray-300'>
                    <div className='switch-ball w-5 h-4 bg-white dark:bg-gray-500 rounded-full shadow'></div>
                  </div>
                  <div className='text-xs text-gray-500 uppercase dark:text-gray-400 mx-2'>
                    dark
                  </div>
                </label>
              </div>
              <h1 className='text-gray-500 text-sm'>SMS Notifications</h1>
              <div className='flex flex-col'>
                {/*  this is the notification change/*/}
                <input
                  type='checkbox'
                  name=''
                  id='notification'
                  className='notification hidden'
                  onClick={toggleNotification}
                />
                <label
                  htmlFor='notification'
                  className='cursor-pointer flex py-5'
                >
                  <div className='text-xs text-gray-500 uppercase dark:text-gray-400 mx-2'>
                    off
                  </div>
                  <div className='w-11 h-4 flex items-center bg-gray-300 rounded-full p2 dark:bg-gray-300'>
                    <div className='notification  notificationball w-5 h-4 bg-white dark:bg-gray-500 rounded-full shadow'></div>
                  </div>
                  <div className='text-xs text-gray-500 uppercase dark:text-gray-400 mx-2'>
                    on
                  </div>
                </label>
              </div>
            </div>

            <div className='flex items-center justify-center mt-3 mb-6 flex-col'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
