import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateUser } from "../store/user";
import Loading from './Loading';
import history from "../history";
import { Link } from "react-router-dom";
// import { useForceUpdate } from "react-spring/node_modules/@react-spring/shared";

const Profile = () => {
  const user = useSelector((state) => state.auth);
  const updatedUser = useSelector((state) => state.user);
  const [isLoading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const loading = async () =>
    new Promise((resolve) => setTimeout(() => resolve(), 1500));

  useEffect(() => {
    (async () => {
      await loading();
      setLoading(!isLoading);
    })()
    dispatch(fetchUpdateUser(user.id));
  }, []);

  return (
    <div className='flex flex-col'>
      {isLoading ? (
        <Loading />
      ) : (
      <div className='flex flex-col  '>
        <div className='flex self-center flex-col fadeIn w-full sm:1/2 md:w-1/2 p-20 sm:p-10 md:p-10 overflow-hidden'>
          <h3 className='  self font-sans uppercase fadeIn p-2 md:text-2xl  text-xl text-center text-gray-800 dark:text-gray-200 text-gray-800  tracking-wider'>
            profile
          </h3>
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
                {/* <p>
                  Morning Reminder: {updatedUser.morningReminder} am
                </p>
                <p>Evening Reminder: {parseFloat(updatedUser.nighttimeReminder )- 12.0} pm</p> */}
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
      )}
    </div>
  );
};

export default Profile;
