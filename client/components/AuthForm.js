import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { Link } from "react-router-dom";

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div>
      {/* ---- form for sign up  ---- */}
      <div className='container max-w-full mx-auto md:py-24 px-6'>
        <div className='max-w-sm mx-auto px-6'>
          <div className='relative flex flex-wrap'>
            <div className='w-full relative'>
              <div className='md:mt-6'>
                <div className=' text-center font-semibold text-black'>
                  welcome
                </div>
                <div className='text-center font-base text-black'>subtitle</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {displayName === "Sign Up" ? (
        <form onSubmit={handleSubmit} name={name} className='mt-8'>
          <div className=' mx-auto max-w-sm '>
            <div className='py-1 flex flex-col'>
              <span className='px-1 text-xs text-gray-600 uppercase'>
                First Name
              </span>
              <label htmlFor='firstName' />
              <input
                placeholder=''
                name='firstName'
                type='text'
                className='flex self-center text-md block px-3 py-2  w-full
     bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-white '
              />
            </div>

            <div className='py-1'>
              <span className='px-1 text-xs text-gray-500 uppercase'>
                Surname
              </span>
              <label htmlFor='lastName' />
              <input
                placeholder=''
                name='lastName'
                type='text'
                className='flex self-center text-md block px-3 py-2  w-full
                bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-white '
              />
            </div>
            <div className='py-1'>
              <span className='px-1 text-xs text-gray-600 uppercase'>Age</span>
              <label htmlFor='age' />
              <input
                placeholder=''
                name='age'
                type='text'
                className='flex self-center text-md block px-3 py-2  w-full
                bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-white '
              />
            </div>
            <div className='py-1'>
              <span className='px-1 text-xs text-gray-600 uppercase'>
                Height(ft)
              </span>
              <label htmlFor='height' />
              <input
                placeholder=''
                name='height'
                type='text'
                className='flex self-center text-md block px-3 py-2  w-full
                bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-white '
              />
            </div>
            <div className='py-1'>
              <span className='px-1 text-xs text-gray-500 uppercase'>
                Weight(lbs)
              </span>
              <label htmlFor='weight' />
              <input
                placeholder=''
                name='weight'
                type='text'
                className='flex self-center text-md block px-3 py-2  w-full
                bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-white '
              />
            </div>
            <div className='py-1'>
              <span className='px-1 text-xs text-gray-500 uppercase'>
                Email
              </span>
              <label htmlFor='email' />
              <input
                placeholder=''
                name='email'
                type='text'
                className='flex self-center text-md block px-3 py-2  w-full
                bg-transparent border-b-2 border-gray-600 focus:border-gray-600 focus:bg-white '
              />
            </div>
            <div className='py-1'>
              <span className='px-1 text-xs text-gray-500 uppercase'>
                Password
              </span>
              <label htmlFor='password'></label>
              <input
                name='password'
                placeholder=''
                type='password'
                x-model='password'
                className='flex self-center text-md block px-3 py-2  w-full
                bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-white '
              />
            </div>
            <button
              className=' flex justify-center mt-3 text-md
              bg-nude w-full text-black
              px-6 py-3 shadow-xl hover:text-black hover:bg-green'
            >
              {displayName}
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit} name={name} className='mt-8'>
          {/* ---- form for log in  ---- */}
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
                className='flex self-center text-md block px-3 py-2  w-full
                bg-transparent border-b-2 border-gray-600 focus:border-gray-600 focus:bg-white '
              />
            </div>

            <div className='py-1'>
              <span className='px-1 text-xs text-gray-600 uppercase'>
                Password
              </span>
              <label htmlFor='password'></label>
              <input
                name='password'
                placeholder=''
                type='password'
                x-model='password'
                className='flex self-center text-md block px-3 py-2  w-full
                bg-transparent border-b-2 border-gray-600 focus:border-gray-600 focus:bg-white '
              />
            </div>
            <button
              className='mt-3 text-md
            bg-nude w-full text-black
            px-6 py-3 block shadow-xl hover:text-black hover:bg-green'
            >
              {displayName}
            </button>
          </div>
        </form>
      )}{" "}
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
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();

      if (evt.target.name === "signup") {
        const formName = evt.target.name;
        const first = evt.target.firstName.value;
        const last = evt.target.lastName.value;
        const age = evt.target.age.value;
        const height = evt.target.height.value;
        const weight = evt.target.weight.value;
        const email = evt.target.email.value;
        const password = evt.target.password.value;
        dispatch(
          authenticate(
            first,
            last,
            age,
            height,
            weight,
            email,
            password,
            formName
          )
        );
      } else {
        const formName = evt.target.name;
        const email = evt.target.email.value;
        const password = evt.target.password.value;
        dispatch(
          authenticate(null, null, null, null, null, email, password, formName)
        );
      }
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
