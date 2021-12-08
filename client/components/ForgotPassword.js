import React, { useState } from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendResetLink } from "../store/auth";

const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const dispatch = useDispatch();

  const forgotPassword = (event) => {
    event.preventDefault();
    const body = {
      email,
    };

    dispatch(sendResetLink(body));

    setEmailSent(true);
  };

  return (
    <div>
      <div className='container max-w-full mx-auto md:py-10 px-6'>
        <div className='max-w-sm mx-auto px-6'>
          <div className='relative flex flex-wrap'>
            <div className='w-full relative'>
              <div className='md:mt-6'>
                <div className=' text-center font-semibold '></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form className='mt-8'>
        {emailSent ? (
          <div>
            <div className='flex flex-col  '>
              <div className='flex items-center justify-center '>
                <div className=' w-full  xs:1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 mt-5 rounded-sm dark:bg-gray-200'>
                  <div className='flex items-center justify-center pt-10 flex-col'>
                    <img src='/user9.svg' className=' w-32' />

                    <h1 className='text-gray-500 text-sm'></h1>
                  </div>
                  <div className='flex justify-center p-6'>
                    <Link to='/login'>
                      <div className=' rounded-sm text-center text-xs text-green-300 border-2 py-1 px-2 border-green-300 dark:text-gray-500 text-gray-800 hover:bg-orange border-grey-500 border-2 py-1 px-2 border-gray-500 dark:text-gray-500  hover:bg-orange hover:border-orange hover:text-white text-gray-800'>
                        A link was sent to your email to reset your password ,
                        you may want to check your spam folder
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='mx-auto max-w-sm '>
            <div className='py-1'>
              <span className='px-1 text-xs text-gray-600 uppercase'>
                Email
              </span>
              <label htmlFor='email' />
              <input
                placeholder=''
                name='email'
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='text-gray-500 flex self-center text-md block px-3 py-2  w-full
                bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-transparent hover:border-orange'
              />
            </div>

            <div
              onClick={forgotPassword}
              className=' mt-5  py-1 flex flex-col '
            >
              <button className='rounded-full w-1/2 self-center text-xs border-grey-500 border-2 py-1 px-2 border-gray-500 dark:text-gray-500  hover:bg-orange hover:border-orange hover:text-white text-gray-800  dark:text-gray-200 '>
                Get Reset link
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

export default ForgotPassword;
