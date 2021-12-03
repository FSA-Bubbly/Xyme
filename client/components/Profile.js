import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateUser } from "../store/user";
import history from "../history";
import { Link } from "react-router-dom";
import { useForceUpdate } from "react-spring/node_modules/@react-spring/shared";

const Profile = () => {
  const user = useSelector((state) => state.auth);
  const updatedUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUpdateUser(user.id, history));
  }, []);

  return (
    <div>
      <div className='flex flex-col  '>
        {/* <p>Password: {user.password}</p> need to solve this */}
        <div className='flex self-center fadeIn w-full sm:full md:w-full p-20 sm:p-20 md:p-20 overflow-scroll  '>
          <h1 className=' w-full self-center font-sans uppercase fadeIn p-2 md:text-2xl text-xl font-bold text-center text-gray-800 dark:text-gray-200 text-gray-800'>
            profile
          </h1>
        </div>
        <div className='flex items-center justify-center '>
          <div className='bg-white w-full  xs:1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 mt-10 rounded-lg dark:bg-gray-200'>
            <div className='flex items-center justify-center pt-10 flex-col'>
              <img src={updatedUser.avatar} className=' w-32' />
              <h1 className='text-gray-800 font-semibold text-xl mt-5'>
                {updatedUser.firstName} {updatedUser.lastName}
              </h1>
              <h1 className='text-gray-500 text-sm'></h1>
              <h1 className='text-gray-500 text-sm p-4 text-left'>
                <p>Age: {updatedUser.age}</p>
                <p>Height: {updatedUser.height}</p>
                <p>Weight: {updatedUser.weight}</p>
                <p>Email: {updatedUser.email}</p>
              </h1>
            </div>
            <div className='flex justify-center p-6'>
              <div>
                <Link
                  to={`/profile/edit`}
                  className=' dark:border-gray-300 text-xs text-green-300 border-2 py-1 px-2 border-green-300 dark:text-gray-500 text-gray-800'
                >
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
