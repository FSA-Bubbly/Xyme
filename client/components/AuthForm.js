import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { Link } from "react-router-dom";
/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div>
      <div class='container max-w-full mx-auto md:py-24 px-6'>
        <div class='max-w-sm mx-auto px-6'>
          <div class='relative flex flex-wrap'>
            <div class='w-full relative'>
              <div class='md:mt-6'>
                <div class='text-center font-semibold text-black'>
                  Welcome to xyme
                </div>
                <div class='text-center font-base text-black'>subtitle</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {displayName === "Sign Up" ? (
        <form onSubmit={handleSubmit} name={name} class='mt-8'>
          <div class='mx-auto max-w-lg '>
            <div class='py-1'>
              <span class='px-1 text-sm text-gray-600'>Email</span>
              <label htmlFor='email' />
              <input
                placeholder=''
                name='email'
                type='text'
                class='text-md block px-3 py-2 rounded-lg w-full
     bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none'
              />
            </div>
            <div class='py-1'>
              <span class='px-1 text-sm text-gray-600'>Password</span>
              <label htmlFor='password'></label>
              <input
                name='password'
                placeholder=''
                type='password'
                x-model='password'
                class='text-md block px-3 py-2 rounded-lg w-full
     bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none'
              />
            </div>
            <button
              class='mt-3 text-md
              bg-nude w-full text-black rounded-lg
              px-6 py-3 block shadow-xl hover:text-black hover:bg-green'
            >
              {displayName}
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit} name={name} class='mt-8'>
          <div class='mx-auto max-w-lg '>
            <div class='py-1'>
              <span class='px-1 text-sm text-gray-600'>Email</span>
              <label htmlFor='email' />
              <input
                placeholder=''
                name='email'
                type='text'
                clasgis='text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none'
              />
            </div>
            <div class='py-1'>
              <span class='px-1 text-sm text-gray-600'>Password</span>
              <label htmlFor='password'></label>
              <input
                name='password'
                placeholder=''
                type='password'
                x-model='password'
                class='text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2  placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none'
              />
            </div>
            <button
              class='mt-3 text-md
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
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      console.log("target event", evt);
      dispatch(authenticate(email, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
