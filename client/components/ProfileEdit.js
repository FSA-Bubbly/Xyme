import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/user";
import history from "../history";

const ProfileEdit = () => {
  const user = useSelector((s) => s.auth);
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(`${user.firstName}`);
  const [lastName, setLastName] = useState(`${user.lastName}`);
  const [age, setAge] = useState(`${user.age}`);
  const [height, setHeight] = useState(`${user.height}`);
  const [weight, setWeight] = useState(`${user.weight}`);
  const [email, setEmail] = useState(`${user.email}`);
  const [password, setPassword] = useState(`${user.password}`);
  const [avatar, setAvatar] = useState(`${user.avatar}`);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = user.id;
    const editedUser = {
      id,
      firstName,
      lastName,
      age,
      height,
      weight,
      email,
      password,
      avatar,
    };
    dispatch(updateUser(editedUser, history));
  };

  return (
    <div>
      <form classNameName='mt-8' onSubmit={handleSubmit}>
        <div classNameName='flex flex-col'>
          {/* <p>Password: {user.password}</p> need to solve this */}
          <div className='flex self-center fadeIn w-full sm:full md:w-full p-20 sm:p-20 md:p-20 overflow-scroll '>
            <h1 className=' w-full self-center font-sans uppercase fadeIn p-2 md:text-2xl pt-3  text-xl font-bold text-center text-gray-800 '>
              Edit Profile
            </h1>
          </div>

          <div className='flex items-center justify-center'>
            <div className='bg-white w-full  xs:1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 mt-10 rounded-lg'>
              <div className='flex items-center justify-center  flex-col'>
                <div className=' md:container md:mx-auto max-w-sm p-5 flex-shrink'>
                  <div className=' py-1'>
                    <span className='px-1 text-xs text-gray-500 uppercase'>
                      Change your Avatar
                    </span>
                  </div>
                  <div className=' flex justify-center py-1'>
                    <img
                      src={avatar}
                      className='flex self-center text-md block px-3 py-2 center
                         focus:border-gray-600 focus:bg-white  w-32'
                    />
                    <select
                      onChange={(e) => setAvatar(e.target.value)}
                      name='avatar'
                      id='avatar'
                      className=' self-center w-10'
                    >
                      <option value='/user1.svg'>1</option>
                      <option value='/user2.svg'>2</option>
                      <option value='/user3.svg'>3</option>
                      <option value='/user4.svg'>4</option>
                      <option value='/user5.svg'>5</option>
                      <option value='/user6.svg'>6</option>
                      <option value='/user7.svg'>7</option>
                      <option value='/user8.svg'>8</option>
                    </select>{" "}
                  </div>
                  <div className=' py-1'>
                    <span className='px-1 text-xs text-gray-500 uppercase'>
                      First Name
                    </span>
                    <label htmlFor='firstName' />
                    <input
                      placeholder={firstName}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      name='firstName'
                      type='text'
                      className='text-gray-500 flex self-center text-md block px-3 py-2  w-full
                        bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-white '
                    />
                  </div>
                  <div className='py-1'>
                    <span className='px-1 text-xs text-gray-500 uppercase'>
                      Last Name
                    </span>
                    <label htmlFor='lastName' />
                    <input
                      placeholder=''
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      name='lastName'
                      type='text'
                      className='flex self-center text-md block px-3 py-2  w-full
                        bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-white '
                    />
                  </div>
                  <div className='py-1'>
                    <span className='px-1 text-xs text-gray-500 uppercase'>
                      Age
                    </span>
                    <label htmlFor='age' />
                    <input
                      placeholder=''
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      name='age'
                      type='text'
                      className='flex self-center text-md block px-3 py-2  w-full
                        bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-white '
                    />
                  </div>
                  <div className='py-1'>
                    <span className='px-1 text-xs text-gray-500 uppercase'>
                      Height(ft)
                    </span>
                    <label htmlFor='height' />
                    <input
                      placeholder=''
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
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
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name='email'
                      type='text'
                      className='flex self-center text-md block px-3 py-2  w-full
                        bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-white '
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
                </div>
                <div className='flex justify-center p-4'>
                  <div>
                    <button
                      className='px-1 text-xs text-gray-500 uppercase hover:bg-nude '
                      value='submit'
                      type='submit'
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
                <div className='flex items-center justify-center mt-3 mb-6 flex-col'>
                  <button
                    className='text-xs text-gray-500'
                    value='cancel'
                    type='button'
                    onClick={() => setEditing(!editing)}
                  >
                    <h1> Cancel</h1>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;