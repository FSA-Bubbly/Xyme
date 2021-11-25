import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { Link } from "react-router-dom";

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div>
      <div className='container max-w-full mx-auto md:py-24 px-6'>
        <div className='max-w-sm mx-auto px-6'>
          <div className='relative flex flex-wrap'>
            <div className='w-full relative'>
              <div className='md:mt-6'>
                <div className='text-center font-semibold text-black'>
                  Welcome to xyme
                </div>
                <div className='text-center font-base text-black'>subtitle</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {displayName === "Sign Up" ? (
        <form onSubmit={handleSubmit} name={name} className='mt-8'>
          <div className=' md:container md:mx-auto max-w-sm p-10  flex-shrink'>
            <div className='py-1'>
              <span className='px-1 text-sm text-gray-600'>First Name</span>
              <label htmlFor='firstName' />
              <input
                placeholder=''
                name='firstName'
                type='text'
                className='text-md block px-3 py-2 rounded-lg w-full
     bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none'
              />
            </div>

            <div className='py-1'>
              <span className='px-1 text-sm text-gray-600'>Surname</span>
              <label htmlFor='lastName' />
              <input
                placeholder=''
                name='lastName'
                type='text'
                className='text-md block px-3 py-2 rounded-lg w-full
     bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none'
              />
            </div>
            <div className='py-1'>
              <span className='px-1 text-sm text-gray-600'>Age</span>
              <label htmlFor='age' />
              <input
                placeholder=''
                name='age'
                type='text'
                className='text-md block px-3 py-2 rounded-lg w-full
     bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none'
              />
            </div>
            <div className='py-1'>
              <span className='px-1 text-sm text-gray-600'>Height(ft)</span>
              <label htmlFor='height' />
              <input
                placeholder=''
                name='height'
                type='text'
                className='text-md block px-3 py-2 rounded-lg w-full
     bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none'
              />
            </div>
            <div className='py-1'>
              <span className='px-1 text-sm text-gray-600'>Weight(lbs)</span>
              <label htmlFor='weight' />
              <input
                placeholder=''
                name='weight'
                type='text'
                className='text-md block px-3 py-2 rounded-lg w-full
     bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none'
              />
            </div>
            <div className='py-1'>
              <span className='px-1 text-sm text-gray-600'>Email</span>
              <label htmlFor='email' />
              <input
                placeholder=''
                name='email'
                type='text'
                className='text-md block px-3 py-2 rounded-lg w-full
     bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none'
              />
            </div>
            <div className='py-1'>
              <span className='px-1 text-sm text-gray-600'>Password</span>
              <label htmlFor='password'></label>
              <input
                name='password'
                placeholder=''
                type='password'
                x-model='password'
                className='text-md block px-3 py-2 rounded-lg w-full
     bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none'
              />
            </div>
            <button
              className='mt-3 text-md
              bg-nude w-full text-black rounded-lg
              px-6 py-3 block shadow-xl hover:text-black hover:bg-green'
            >
              {displayName}
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit} name={name} className='mt-8'>
          <div className='mx-auto max-w-sm '>
            <div className='py-1'>
              <span className='px-1 text-sm text-gray-600'>Email</span>
              <label htmlFor='email' />
              <input
                placeholder=''
                name='email'
                type='text'
                className='text-md block px-3 py-2 rounded-lg w-full
     bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none'
              />
            </div>

            <div className='py-1'>
              <span className='px-1 text-sm text-gray-600'>Password</span>
              <label htmlFor='password'></label>
              <input
                name='password'
                placeholder=''
                type='password'
                x-model='password'
                className='text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2  placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none'
              />
            </div>
            <button
              className='mt-3 text-md
            bg-nude w-full text-black rounded-lg
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
