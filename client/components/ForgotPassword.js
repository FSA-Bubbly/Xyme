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
        {/* ---- form for log in  ---- */}
        {emailSent ? (
          <div>
            <span>An email with reset instructions is on its way</span>
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
              <button
                onClick={forgotPassword}
                className='rounded-full w-1/2 self-center text-xs border-grey-500 border-2 py-1 px-2 border-gray-500 dark:text-gray-500 dark:border-gray-300 hover:bg-orange hover:border-orange hover:text-white text-gray-800'
              >
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
