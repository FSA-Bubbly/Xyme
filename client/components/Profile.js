import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/user";

const Profile = () => {
  const user = useSelector((s) => s.auth);
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    dispatch(updateUser(editedUser));
    window.location = "/profile";
  };

  return (
    <div>
      {!editing ? (
        <div classNameName='flex flex-col'>
          {/* <p>Password: {user.password}</p> need to solve this */}

          <div className='flex items-center justify-center'>
            <div className='bg-white w-full  xs:1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 mt-10 rounded-lg'>
              <div className='flex items-center justify-center pt-10 flex-col'>
                <img src={user.avatar} className=' w-32' />
                <h1 className='text-gray-800 font-semibold text-xl mt-5'>
                  {user.firstName} {user.lastName}
                </h1>
                <h1 className='text-gray-500 text-sm'></h1>
                <h1 className='text-gray-500 text-sm p-4 text-left'>
                  <p>Age: {user.age}</p>
                  <p>Height: {user.height}</p>
                  <p>Weight: {user.weight}</p>
                  <p>Email: {user.email}</p>
                </h1>
              </div>
              <div className='flex justify-center p-4'>
                <div>
                  <button
                    className='text-xs text-green-300 border-2 py-1 px-2 border-green-300'
                    value='edit'
                    type='button'
                    onClick={() => setEditing(!editing)}
                  >
                    {" "}
                    Edit Profile
                  </button>
                </div>
              </div>
              <div className='flex items-center justify-center mt-3 mb-6 flex-col'>
                <h1 className='text-xs text-gray-500'>Get Connected</h1>
                <div className='flex mt-2'>
                  <hr></hr>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form classNameName='mt-8' onSubmit={handleSubmit}>
          <div classNameName='flex flex-col'>
            {/* <p>Password: {user.password}</p> need to solve this */}

            <div className='flex items-center justify-center'>
              <div className='bg-white w-full  xs:1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 mt-10 rounded-lg'>
                <div className='flex items-center justify-center pt-10 flex-col'>
                  <div className=' md:container md:mx-auto max-w-sm p-10 flex-shrink'>
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
                        placeholder=''
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        name='firstName'
                        type='text'
                        className='flex self-center text-md block px-3 py-2  w-full
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
      )}
    </div>
  );
};

export default Profile;
