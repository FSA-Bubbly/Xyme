import React, { useState } from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';
import { checkUserExists } from '../store/user';
import validator from 'validator';

import history from '../history';
const AuthForm = (props) => {
	const { name, displayName, handleSubmit, error } = props;
	const [errors, setErrors] = useState({});
	const [phone, setPhone] = useState('');

	const [userAvatar, setUserAvatar] = useState('/user1.svg');

	const toReset = () => {
		history.push('/forgot');
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
	const checkError = (userObj, checkEmail) => {
		const formErrors = {};
		for (const [key, value] of Object.entries(userObj)) {
			if (key === 'first') {
				if (value.length < 2)
					formErrors[key] = 'Please enter a valid First Name';
			} else if (key === 'last') {
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
				//If not valid email address
				if (!validator.isEmail(value)) {
					formErrors[key] = 'Please enter a valid Email Address';
				}
				//If it is an email and email already exists => signup
				else if (checkEmail == 'exists' && userObj.formName == 'signup') {
					formErrors[key] = 'Email Address is already in use';
				}
				//Is an email and doesn't exist in our db
				else if (checkEmail != 'exists' && userObj.formName == 'login') {
					console.log(checkEmail, userObj.formName);
					formErrors[key] = 'Email Address does not exist';
				}
			} else if (key === 'password') {
				if (value.length < 8 || !/\d/.test(value) || !/[a-zA-z]/g.test(value))
					formErrors[key] =
						'Passwords must be at least 8 characters long and must include a number';
			}
		}
		setErrors(formErrors);
		return formErrors;
	};

	const handleAuth = (event) => {
		handleSubmit(event, checkError);
	};

	return (
		<div>
			{/* ---- form for sign up  ---- */}
			<div className='container max-w-full mx-auto md:py-10 px-6'>
				<div className='max-w-sm mx-auto px-6'>
					<div className='relative flex flex-wrap'>
						<div className='w-full relative'>
							<div className='md:mt-6'>
								<div className=' text-center font-semibold '>
									{displayName === 'Sign Up' ? 'Create an Account' : 'Login'}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{displayName === 'Sign Up' ? (
				<form onSubmit={handleAuth} name={name} className='mt-8'>
					<div className=' mx-auto max-w-sm '>
						<div className='py-1 flex flex-col'>
							<label
								className='px-30 mb-5 self-center text-xs text-gray-600 uppercase'
								htmlFor=''>
								Select your Avatar:
							</label>
							<img src={userAvatar} className=' self-center w-32' />
							<select
								onChange={(e) => setUserAvatar(e.target.value)}
								name='avatar'
								id='avatar'
								className=' bg-nude self-end w-10 dark:bg-gray-800 dark:text-gray-200'>
								<option value='/user1.svg'>1</option>
								<option value='/user2.svg'>2</option>
								<option value='/user3.svg'>3</option>
								<option value='/user4.svg'>4</option>
								<option value='/user5.svg'>5</option>
								<option value='/user6.svg'>6</option>
								<option value='/user7.svg'>7</option>
								<option value='/user8.svg'>8</option>
								<option value='/user9.svg'>9</option>
								<option value='/user10.svg'>10</option>
								<option value='/user11.svg'>11</option>
								<option value='/user12.svg'>12</option>
								<option value='/user13.svg'>13</option>
							</select>{' '}
							<span className='px-1 text-xs text-gray-600 uppercase'>
								First Name
							</span>
							<label htmlFor='firstName' />
							<input
								placeholder=''
								name='firstName'
								type='text'
								className='text-gray-500 flex self-center text-md block px-3 py-2  w-full
                bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-transparent focus:outline-0 hover:border-orange'
							/>
							{errors.first && (
								<p className='px-1 text-xs text-red-500'>{errors.first}</p>
							)}
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
								className='text-gray-500 flex self-center text-md block px-3 py-2  w-full
                bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-transparent hover:border-orange'
							/>
							{errors.last && (
								<p className='px-1 text-xs text-red-500'>{errors.last}</p>
							)}
						</div>
						<div className='py-1'>
							<span className='px-1 text-xs text-gray-600 uppercase'>Age</span>
							<label htmlFor='age' />
							<input
								placeholder=''
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
							<span className='px-1 text-xs text-gray-600 uppercase'>
								Height(ft)
							</span>
							<label htmlFor='height' />
							<input
								placeholder=''
								name='height'
								type='text'
								className='text-gray-500 flex self-center text-md block px-3 py-2  w-full
                bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-transparent hover:border-orange'
							/>{' '}
							{errors.height && (
								<p className='px-1 text-xs text-red-500'>{errors.height}</p>
							)}
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
								className='text-gray-500 flex self-center text-md block px-3 py-2  w-full
                bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-transparent hover:border-orange'
							/>
							{errors.weight && (
								<p className='px-1 text-xs text-red-500'>{errors.weight}</p>
							)}
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
								className='text-gray-500 flex self-center text-md block px-3 py-2  w-full
                bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-transparent hover:border-orange'
							/>
							{errors.email && (
								<p className='px-1 text-xs text-red-500'>{errors.email}</p>
							)}
						</div>

						<div className='py-1'>
							<span className='px-1 text-xs text-gray-500 uppercase'>
								Phone (optional)
							</span>
							<label htmlFor='phone' />
							<input
								onChange={(e) => formatPhoneNumber(e.target.value)}
								value={phone}
								placeholder=''
								name='phone'
								type='text'
								className='flex self-center text-md block px-3 py-2  w-full
                bg-transparent border-b-2 border-gray-600 focus:border-gray-600 focus:bg-transparent hover:border-orange'
							/>
						</div>

						<div className='py-1'>
							<span className='px-1 text-xs text-gray-500 uppercase'>
								MORNING REMINDER: (optional)
							</span>
							<label htmlFor='morningReminder' />
							<input
								defaultValue='09:00'
								name='morningReminder'
								type='time'
								className='flex self-center text-md block px-3 py-2  w-full
                bg-transparent border-b-2 border-gray-600 focus:border-gray-600 focus:bg-transparent hover:border-orange'
							/>
						</div>

						<div className='py-1'>
							<span className='px-1 text-xs text-gray-500 uppercase'>
								NIGHTTIME REMINDER: (optional)
							</span>
							<label htmlFor='nighttimeReminder' />
							<input
								defaultValue='21:00'
								name='nighttimeReminder'
								type='time'
								className='flex self-center text-md block px-3 py-2  w-full
                bg-transparent border-b-2 border-gray-600 focus:border-gray-600 focus:bg-transparent hover:border-orange '
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
								className='text-gray-500 flex self-center text-md block px-3 py-2  w-full
                bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-transparent hover:border-orange'
							/>
						</div>
						<div className='py-1 flex flex-row justify-between my-5'>
							<span className=' self-start px-1 text-xs text-gray-500 uppercase'>
								Do you wish to receive SMS reminders?
							</span>
							<label htmlFor='sms' />
							<input
								placeholder=''
								name='sms'
								type='checkbox'
								id='sms'
								className=' sms flex self-center text-md block
                       form-checkbox rounded focus:outline-none text-orange w-4 h-4 text-center '
							/>
						</div>

						{errors.password && (
							<p className='px-1 text-xs text-red-500'>{errors.password}</p>
						)}
					</div>

					<div className='mt-10 py-1 flex flex-col '>
						<button className='rounded-full w-1/2 self-center text-xs border-grey-500 border-2 py-1 px-2 border-gray-500 dark:text-gray-200 dark:border-orange hover:bg-orange hover:border-orange hover:text-grey-800 text-gray-800'>
							{displayName}
						</button>
					</div>
				</form>
			) : (
				<form onSubmit={handleAuth} name={name} className='mt-8'>
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
								className='text-gray-500 flex self-center text-md block px-3 py-2  w-full
                bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-transparent hover:border-orange'
							/>
							{errors.email && (
								<p className='px-1 text-xs text-red-500'>{errors.email}</p>
							)}
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
								className='text-gray-500 flex self-center text-md block px-3 py-2  w-full
                bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-transparent focus:border-green  hover:border-orange '
							/>{' '}
							{errors.password && (
								<p className='px-1 text-xs text-red-500'>{errors.password}</p>
							)}
						</div>

						<div className=' mt-20  py-1 flex flex-col '>
							<button className='rounded-full w-1/2 self-center text-xs border-grey-500 border-2 py-1 px-2 border-gray-500 dark:text-gray-200 dark:border-orange hover:bg-orange hover:border-orange hover:text-grey-800 text-gray-800'>
								{displayName}
							</button>
						</div>

						<div className=' mt-5  py-1 flex flex-col '>
							<button
								onClick={toReset}
								className='rounded-full w-1/2 self-center text-xs border-grey-500 border-2 py-1 px-2 border-gray-500 dark:text-gray-200 dark:border-orange hover:bg-orange hover:border-orange hover:text-grey-800 text-gray-800'>
								Forgot Password
							</button>
						</div>
					</div>
				</form>
			)}{' '}
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
		name: 'login',
		displayName: 'Login',
		error: state.auth.error,
	};
};

const mapSignup = (state) => {
	return {
		name: 'signup',
		displayName: 'Sign Up',
		error: state.auth.error,
	};
};

const mapDispatch = (dispatch) => {
	const checkbox = document.getElementsByClassName('sms');
	return {
		async handleSubmit(evt, checkError) {
			evt.preventDefault();

			if (evt.target.name === 'signup') {
				const user = {
					formName: evt.target.name,
					first: evt.target.firstName.value,
					last: evt.target.lastName.value,
					age: evt.target.age.value,
					sms: checkbox[0].checked,
					phone: evt.target.phone.value,
					morningReminder: evt.target.morningReminder.value,
					nighttimeReminder: evt.target.nighttimeReminder.value,
					height: evt.target.height.value,
					weight: evt.target.weight.value,
					email: evt.target.email.value,
					password: evt.target.password.value,
					avatar: evt.target.avatar.value,
				};
				let emailCheck = await dispatch(checkUserExists(user.email));

				let userError = checkError(user, emailCheck);
				if (Object.keys(userError).length == 0) {
					dispatch(authenticate(user));
				}
			} else {
				const user = {
					formName: evt.target.name,
					email: evt.target.email.value,
					password: evt.target.password.value,
				};
				let emailCheck = await dispatch(checkUserExists(user.email));
				let userError = checkError(user, emailCheck);
				if (Object.keys(userError).length == 0) {
					dispatch(authenticate(user));
				}
			}
		},
	};
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
