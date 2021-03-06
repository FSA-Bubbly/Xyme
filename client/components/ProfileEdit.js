import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, fetchUpdateUser } from '../store/user';
import history from '../history';
import { Link } from 'react-router-dom';
import validator from 'validator';

const ProfileEdit = () => {
	const { auth } = useSelector((s) => s);
	const { user } = useSelector((s) => s);
	const dispatch = useDispatch();
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
	const [errors, setErrors] = useState({});

	// for persisting state
	useEffect(() => {
		dispatch(fetchUpdateUser(auth.id));
	}, [auth.id]);
	useEffect(() => {
		setFirstName(`${user.firstName}`);
		setLastName(`${user.lastName}`);
		setAge(`${user.age}`);
		setHeight(`${user.height}`);
		setWeight(`${user.weight}`);
		setEmail(`${user.email}`);
		setSms(`${user.sms}`);
		setPhone(`${user.phone}`);
		setMorningReminder(`${user.morningReminder}`);
		setNighttimeReminder(`${user.nighttimeReminder}`);
		setAvatar(`${user.avatar}`);
		setPassword(`${user.password}`);
	}, [user]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const id = user.id;
		let editedUser = {
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
		let formErrors = checkError(editedUser);
		if (Object.keys(formErrors).length == 0) {
			dispatch(updateUser(editedUser, history));
		}
	};

	const formatDigitOnly = (value) => {
		return value.replace(/[^\d]/g, '');
	};

	const formatPhoneNumber = (value) => {
		if (!value) return value;

		const phoneNumber = formatDigitOnly(value);
		if (phoneNumber.length < 4) return phoneNumber;

		if (phoneNumber.length < 7) {
			return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
		}

		return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
			3,
			6
		)}-${phoneNumber.slice(6, 10)}`;
	};

	//Error Checking -> Adds text under labels
	const checkError = (userObj) => {
		const formErrors = {};
		for (const [key, value] of Object.entries(userObj)) {
			if (key === 'firstName') {
				if (value.length < 2)
					formErrors[key] = 'Please enter a valid First Name';
			} else if (key === 'lastName') {
				if (value.length < 2)
					formErrors[key] = 'Please enter a valid Last Name';
			} else if (key === 'age') {
				if (value < 18 || value > 110)
					formErrors[key] = 'Users must be over 18';
			} else if (key === 'height') {
				if (value > 120 || value < 20)
					formErrors[key] = 'Please enter a valid Height';
			} else if (key === 'weight') {
				if (value < 10 || value > 500)
					formErrors[key] = 'Please enter a valid Weight';
			} else if (key === 'email') {
				if (!validator.isEmail(value))
					formErrors[key] = 'Please enter a valid Email Address';
			} else if (key === 'password') {
				if (value.length < 8 || !/\d/.test(value) || !/[a-zA-z]/g.test(value))
					formErrors[key] =
						'Passwords must be at least 8 characters long and must include a number';
			}
		}
		setErrors(formErrors);
		return formErrors;
	};

	return (
		<div>
			<form className='mt-8' onSubmit={(e) => handleSubmit(e)}>
				<div className='flex flex-col'>
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
											className=' self-center w-10 dark:bg-gray-200 dark:text-gray-800'>
											<option value='/user1.svg'>1</option>
											<option value='/user2.svg'>2</option>
											<option value='/user3.svg'>3</option>
											<option value='/user4.svg'>4</option>
											<option value='/user5.svg'>5</option>
											<option value='/user6.svg'>6</option>
											<option value='/user7.svg'>7</option>
											<option value='/user8.svg'>8</option>
											<option value='/user9.svg'>9</option>
											<option value='/user11.svg'>10</option>
											<option value='/user12.svg'>11</option>
											<option value='/user13.svg'>12</option>
										</select>{' '}
									</div>
									<div className=' py-1'>
										<span className='px-1 text-xs text-gray-500 uppercase'>
											First Name
										</span>
										<label htmlFor='firstName' />
										<input
											placeholder={firstName}
											value={firstName}
											onChange={(e) => {
												setFirstName(e.target.value);
											}}
											name='firstName'
											type='text'
											className='text-gray-500 flex self-center text-md block px-3 py-2  w-full
                      bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-transparent hover:border-orange'
										/>
										{errors.firstName && (
											<p className='px-1 text-xs text-red-500'>
												{errors.firstName}
											</p>
										)}
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
										/>{' '}
										{errors.lastName && (
											<p className='px-1 text-xs text-red-500'>
												{errors.lastName}
											</p>
										)}
									</div>
									<div className='py-1'>
										<span className='px-1 text-xs text-gray-500 uppercase'>
											Age
										</span>
										<label htmlFor='age' />
										<input
											placeholder=''
											value={age}
											onChange={(e) => setAge(formatDigitOnly(e.target.value))}
											name='age'
											type='text'
											className='text-gray-500 flex self-center text-md block px-3 py-2  w-full
                      bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-transparent hover:border-orange'
										/>
										{errors.age && (
											<p className='px-1 text-xs text-red-500'>{errors.age}</p>
										)}
									</div>
									<div className='py-1'>
										<span className='px-1 text-xs text-gray-500 uppercase'>
											Height(in)
										</span>
										<label htmlFor='height' />
										<input
											placeholder=''
											value={height}
											onChange={(e) =>
												setHeight(formatDigitOnly(e.target.value))
											}
											name='height'
											type='text'
											className='text-gray-500 flex self-center text-md block px-3 py-2  w-full
                      bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-transparent hover:border-orange'
										/>
										{errors.height && (
											<p className='px-1 text-xs text-red-500'>
												{errors.height}
											</p>
										)}
									</div>
									<div className='py-1'>
										<span className='px-1 text-xs text-gray-500 uppercase'>
											Weight(lbs)
										</span>
										<label htmlFor='weight' />
										<input
											placeholder=''
											value={weight}
											onChange={(e) =>
												setWeight(formatDigitOnly(e.target.value))
											}
											name='weight'
											type='text'
											className='text-gray-500 flex self-center text-md block px-3 py-2  w-full
                      bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-transparent hover:border-orange'
										/>
										{errors.weight && (
											<p className='px-1 text-xs text-red-500'>
												{errors.weight}
											</p>
										)}
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
										{errors.email && (
											<p className='px-1 text-xs text-red-500'>
												{errors.email}
											</p>
										)}
									</div>

									<div className='py-1'>
										<span className='px-1 text-xs text-gray-500 uppercase'>
											Phone (Optional)
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
											value={password}
											name='password'
											placeholder=''
											type='password'
											className='text-gray-500 flex self-center text-md block px-3 py-2  w-full
                      bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-transparent hover:border-orange'

                    />
                    {errors.password && (
                      <p className='px-1 text-xs text-red-500'>
                        {errors.password}
                      </p>
                    )}
                  </div>
                  <div className='flex justify-evenly py-4'>
                    <Link
                      to={`/profile`}
                      className='text-xs text-green-300 border-2 py-1 px-2 border-green-300 dark:text-gray-500 text-gray-800 dark:border-gray-300 hover:bg-orange hover:text-white hover:border-orange'
                    >
                      Cancel
                    </Link>
                    <button
                      className='text-xs text-green-300 border-2 py-1 px-2 border-green-300 dark:text-gray-500 dark:border-gray-300 text-gray-800 hover:bg-orange hover:text-white hover:border-orange '
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
