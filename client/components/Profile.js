import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/user";

const Profile = () => {
  const user = useSelector(s => s.auth);
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const id = user.id;
    const editedUser = {id, firstName, lastName, age, height, weight, email, password}
    dispatch(updateUser(editedUser));
    window.location = '/profile';
  };

  return (
    <div>
      {
        !editing ? (
          <div className='profile'>
            <button
              value='edit'
              type='button'
              onClick={() => setEditing(!editing)}
            >Edit Profile</button>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Age: {user.age}</p>
            <p>Height: {user.height}</p>
            <p>Weight: {user.weight}</p>
            <p>Email: {user.email}</p>
            <p>Password: {user.password}</p> {/* need to solve this */}
          </div>
        ) : (
          <form className='mt-8' onSubmit={handleSubmit}>
          <div className=' md:container md:mx-auto max-w-sm p-10  flex-shrink'>
            <div className='py-1'>
              <span className='px-1 text-sm text-gray-600'>First Name</span>
              <label htmlFor='firstName' />
              <input
                placeholder=''
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                name='firstName'
                type='text'
                className='text-md block px-3 py-2 rounded-lg w-full
     bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none'
              />
            </div>

            <div className='py-1'>
              <span className='px-1 text-sm text-gray-600'>Last Name</span>
              <label htmlFor='lastName' />
              <input
                placeholder=''
                value={lastName}
                onChange={e => setLastName(e.target.value)}
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
                value={age}
                onChange={e => setAge(e.target.value)}
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
                value={height}
                onChange={e => setHeight(e.target.value)}
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
                value={weight}
                onChange={e => setWeight(e.target.value)}
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
                value={email}
                onChange={e => setEmail(e.target.value)}
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
              value='submit'
              type='submit'
            >
              Submit
            </button>
            <button
              className='mt-3 text-md
              bg-nude w-full text-black rounded-lg
              px-6 py-3 block shadow-xl hover:text-black hover:bg-green'
              value='cancel'
              type='button'
              onClick={() => setEditing(!editing)}
            >
              Cancel
            </button>
          </div>
        </form>
        )
      }
    </div>
  )
}

export default Profile;
