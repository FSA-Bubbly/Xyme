import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../store/user";
import history from "../history";
import { Link } from "react-router-dom";

const ProfileEdit = () => {
<<<<<<< HEAD
  const user = useSelector((s) => s.user);
  const [firstName, setFirstName] = useState(`${user.firstName}`);
  const [lastName, setLastName] = useState(`${user.lastName}`);
  const [age, setAge] = useState(`${user.age}`);
  const [height, setHeight] = useState(`${user.height}`);
  const [weight, setWeight] = useState(`${user.weight}`);
  const [email, setEmail] = useState(`${user.email}`);
  const [sms, setSms] = useState(`${user.sms}`);
  const [phone, setPhone] = useState(`${user.phone}`);
  const [morningReminder, setMorningReminder] = useState(
    `${user.morningReminder}`
  );
  const [nighttimeReminder, setNighttimeReminder] = useState(
    `${user.nighttimeReminder}`
  );
  const [password, setPassword] = useState(`${user.password}`);
  const [avatar, setAvatar] = useState(`${user.avatar}`);
  const dispatch = useDispatch();
=======
	const { user } = useSelector((s) => s);
	const [firstName, setFirstName] = useState(`${user.firstName}`);
	const [lastName, setLastName] = useState(`${user.lastName}`);
	const [age, setAge] = useState(`${user.age}`);
	const [height, setHeight] = useState(`${user.height}`);
	const [weight, setWeight] = useState(`${user.weight}`);
	const [email, setEmail] = useState(`${user.email}`);
	const [sms, setSms] = useState(`${user.sms}`);
	const [phone, setPhone] = useState(`${user.phone}`);
	const [morningReminder, setMorningReminder] = useState(
		`${user.morningReminder}`
	);
	const [nighttimeReminder, setNighttimeReminder] = useState(
		`${user.nighttimeReminder}`
	);
	const [password, setPassword] = useState(`${user.password}`);
	const [avatar, setAvatar] = useState(`${user.avatar}`);
	const dispatch = useDispatch();
>>>>>>> 98f0019051589210b43f8a98c7769150b40143ba

  console.log(password);
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
      sms,
      phone,
      morningReminder,
      nighttimeReminder,
      password,
      avatar,
    };
    dispatch(updateUser(editedUser, history));
  };

  const formatPhoneNumber = (value) => {
    if (!value) return value;

    const phoneNumber = value.replace(/[^\d]/g, "");

    if (phoneNumber.length < 4) return phoneNumber;

    if (phoneNumber.length < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }

    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;

    // const phoneNumber = value.replace(/[])
  };

  return (
    <div>
      <form classNameName='mt-8' onSubmit={handleSubmit}>
        <div classNameName='flex flex-col'>
          {/* <p>Password: {user.password}</p> need to solve this */}
          <div className='flex self-center fadeIn w-full sm:full md:w-full p-20 sm:p-20 md:p-20 overflow-hidden '>
            <h1 className=' w-full self-center font-sans uppercase fadeIn p-2 md:text-2xl pt-3  text-xl tracking-wider text-center text-gray-800  dark:text-gray-200 text-gray-800'>
              Edit Profile
            </h1>
          </div>

          <div className='flex items-center justify-center'>
            <div className='bg-white  dark:bg-gray-200 w-full  xs:1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 mt-10 rounded-lg'>
              <div className='flex items-center justify-center  flex-col'>
                <div className=' md:container md:mx-auto max-w-sm p-5 flex-shrink'>
                  <div className=' py-1'>
                    <span className='px-1 text-xs text-gray-500 uppercase'>
                      Change your Avatar
                    </span>
                  </div>
                  <div className=' flex flex-col justify-center py-1'>
                    <img
                      src={avatar}
                      className='flex  m-2 self-center text-md block px-3 py-2 center
                         focus:border-gray-600 focus:bg-white  w-32 '
                    />
                    <select
                      onChange={(e) => setAvatar(e.target.value)}
                      name='avatar'
                      id='avatar'
                      className=' self-center w-10 dark:bg-gray-200 dark:text-gray-800'
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
                      bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-transparent hover:border-orange'
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
                      className='text-gray-500 flex self-center text-md block px-3 py-2  w-full
                      bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-transparent hover:border-orange'
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
                      className='text-gray-500 flex self-center text-md block px-3 py-2  w-full
                      bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-transparent hover:border-orange'
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
                      className='text-gray-500 flex self-center text-md block px-3 py-2  w-full
                      bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-transparent hover:border-orange'
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
                      className='text-gray-500 flex self-center text-md block px-3 py-2  w-full
                      bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-transparent hover:border-orange'
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
                      className='text-gray-500 flex self-center text-md block px-3 py-2  w-full
                      bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-transparent hover:border-orange'
                    />
                  </div>

                  <div className='py-1'>
                    <span className='px-1 text-xs text-gray-500 uppercase'>
                      Do you wish to receive SMS reminders?
                    </span>
                    <label htmlFor='sms' />
                    <input
                      placeholder=''
                      value={sms}
                      onChange={(e) => setSms(e.target.value)}
                      name='sms'
                      type='checkbox'
                      className='flex self-center text-md block px-3 py-2  w-full
                        bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-white '
                    />
                  </div>

                  <div className='py-1'>
                    <span className='px-1 text-xs text-gray-500 uppercase'>
                      Phone
                    </span>
                    <label htmlFor='phone' />
                    <input
                      placeholder=''
                      value={phone}
                      onChange={(e) =>
                        setPhone(formatPhoneNumber(e.target.value))
                      }
                      name='phone'
                      type='text'
                      className='text-gray-500 flex self-center text-md block px-3 py-2  w-full
                      bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-transparent hover:border-orange'
                    />
                  </div>
                  <div className='py-1'>
                    <span className='px-1 text-xs text-gray-500 uppercase'>
                      MORNING REMINDER: (optional)
                    </span>
                    <label htmlFor='morningReminder' />
                    <input
                      // defaultValue="09:00"
                      value={morningReminder}
                      onChange={(e) => setMorningReminder(e.target.value)}
                      name='morningReminder'
                      type='time'
                      className='text-gray-500 flex self-center text-md block px-3 py-2  w-full
                      bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-transparent hover:border-orange'
                    />
                  </div>

                  <div className='py-1'>
                    <span className='px-1 text-xs text-gray-500 uppercase'>
                      Evening REMINDER: (optional)
                    </span>
                    <label htmlFor='nighttimeReminder' />
                    <input
                      value={nighttimeReminder}
                      onChange={(e) => setNighttimeReminder(e.target.value)}
                      name='nighttimeReminder'
                      type='time'
                      className='text-gray-500 flex self-center text-md block px-3 py-2  w-full
                      bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-transparent hover:border-orange'
										/>
									</div>
									<div className='py-1'>
										<span className='px-1 text-xs text-gray-500 uppercase'>
											Password
										</span>
										<label htmlFor='password'></label>
										<input
											onChange={(e) => setPassword(e.target.value)}
											value=''
											name='password'
											placeholder='  '
											type='password'
											className='text-gray-500 flex self-center text-md block px-3 py-2  w-full
                      bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-transparent hover:border-orange'
                    />
                  </div>
                  <div className='flex justify-evenly py-4'>
                    <Link
                      to={`/profile`}
                      className='text-xs text-green-300 border-2 py-1 px-2 border-green-300 dark:text-gray-500 text-gray-800 dark:border-gray-300'
                    >
                      Cancel
                    </Link>
                    <button
                      className='text-xs text-green-300 border-2 py-1 px-2 border-green-300 dark:text-gray-500 dark:border-gray-300 text-gray-800'
                      value='submit'
                      type='submit'
                      onClick={handleSubmit}
                    >
                      Save Changes
                    </button>
                  </div>
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
