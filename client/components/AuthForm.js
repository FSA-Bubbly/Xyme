import React, { useState } from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../store';

import history from '../history';
const AuthForm = (props) => {
	const { name, displayName, handleSubmit, error } = props;
	const [userAvatar, setUserAvatar] = useState('/user1.svg');

	const toReset = () => {
		history.push('/forgot');
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
				<form onSubmit={handleSubmit} name={name} className='mt-8'>
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
								name='sms'
								type='checkbox'
								id='sms'
								// value = {toggleNotification}
								//  onClick={toggleNotification}
								className='sms flex self-center text-md block px-3 py-2  w-full
                        bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-white '
							/>
						</div>

						<div className='py-1'>
							<span className='px-1 text-xs text-gray-500 uppercase'>
								Phone (optional)
							</span>
							<label htmlFor='phone' />
							<input
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

						<div className='mt-10 py-1 flex flex-col '>
							<button className='rounded-full w-1/2 self-center text-xs border-grey-500 border-2 py-1 px-2 border-gray-500 dark:text-gray-200 dark:border-orange hover:bg-orange hover:border-orange hover:text-grey-800 text-gray-800'>
								{displayName}
							</button>
						</div>
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
								className='text-gray-500 flex self-center text-md block px-3 py-2  w-full
                bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-transparent hover:border-orange'
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
								className='text-gray-500 flex self-center text-md block px-3 py-2  w-full
                bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-transparent focus:border-green  hover:border-orange '
							/>
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
		handleSubmit(evt) {
			evt.preventDefault();

			if (evt.target.name === 'signup') {
				const formName = evt.target.name;
				const first = evt.target.firstName.value;
				const last = evt.target.lastName.value;
				const age = evt.target.age.value;
				const sms = checkbox[0].checked;
				const phone = evt.target.phone.value;
				const morningReminder = evt.target.morningReminder.value;
				const nighttimeReminder = evt.target.nighttimeReminder.value;
				const height = evt.target.height.value;
				const weight = evt.target.weight.value;
				const email = evt.target.email.value;
				const password = evt.target.password.value;
				const avatar = evt.target.avatar.value;
				dispatch(
					authenticate(
						first,
						last,
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
						formName
					)
				);
			} else {
				const formName = evt.target.name;
				const email = evt.target.email.value;
				const password = evt.target.password.value;
				dispatch(
					authenticate(
						null,
						null,
						null,
						null,
						null,
						email,
						null,
						null,
						null,
						null,
						password,
						null,
						formName
					)
				);
			}
		},
	};
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
