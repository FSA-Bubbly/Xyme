import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addPillToWallet } from '../store/wallet';
import { addInteractions } from '../store/interactions';
import history from '../history';
import DatePicker from 'react-datepicker';
import Camera from './Camera';

const AddPillForm = () => {
	const dispatch = useDispatch();
	const { auth: user } = useSelector((s) => s);
	const [pillName, setPillName] = useState('');
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [frequencyPerDay, setFrequencyPerDay] = useState(1);
	const nameRef = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();
		const pillToAdd = {
			userId: user.id,
			pillName: `${pillName[0].toUpperCase()}${pillName
				.slice(1)
				.toLowerCase()}`,
			startDate,
			endDate,
			frequencyPerDay,
		};
		const addPillandInteraction = async () => {
			await dispatch(addPillToWallet(pillToAdd));
			dispatch(addInteractions(user, history));
		};
		addPillandInteraction();
	};

	const retrieveName = (visionPill) => {
		setPillName(visionPill);
		nameRef.current.focus();
	};

	return (
		<div>
			<form id='add-pill m-t-8' onSubmit={handleSubmit}>
				<div className='flex flex-col'>
					<div className='flex self-center fadeIn w-full sm:full md:w-full lg:w-full xl:w-full p-20 sm:p-20 md:p-20 overflow-hidden '>
						<h1 className=' w-full self-center font-sans uppercase fadeIn p-2 md:text-2xl pt-3  text-xl font-bold text-center text-gray-800  dark:text-gray-200 text-gray-800'>
							add to wallet
						</h1>
					</div>

					<div className='flex items-center justify-center'>
						<div className='bg-white  dark:bg-gray-200 w-full  xs:1/3 sm:w-1/3 md:w-1/3 lg:w-1/3 mt-10 rounded-lg'>
							<div className='flex items-center justify-center  flex-col'>
								<div className=' md:container md:mx-auto max-w-sm p-5 flex-shrink'>
									<div className=' py-1'>
										<span className='px-1 text-xs text-gray-500 uppercase'>
											Scan/upload an image
											<div>
												<br />
												<Camera
													className='text-center'
													walletCallBack={retrieveName}
												/>
											</div>
										</span>
									</div>
									<div className=' py-1'>
										<label
											className='px-1 text-xs text-gray-500 uppercase'
											htmlFor='pill-name'>
											Pill Name
										</label>

										<input
											placeholder='Enter pill name here'
											value={pillName}
											onChange={(e) => setPillName(e.target.value)}
											ref={nameRef}
											name='pill-name'
											type='text'
											className='text-gray-500 flex self-center text-md block px-3 py-2  w-full
                      bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-transparent hover:border-orange'
										/>
									</div>
									<div className='py-1'>
										<label
											className='px-1 text-xs text-gray-500 uppercase'
											htmlFor='startdate'>
											Start Date
										</label>
										<DatePicker
											className='text-gray-500 flex self-center text-md block px-3 py-2  w-full
                      bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-transparent hover:border-orange'
											selected={startDate}
											placeholder='Enter date'
											onChange={(date) => setStartDate(date)}
										/>
									</div>
									<div className='py-1'>
										<label
											className='px-1 text-xs text-gray-500 uppercase'
											htmlFor='end date'>
											End Date
										</label>
										<DatePicker
											className='text-gray-500 flex self-center text-md block px-3 py-2  w-full
                      bg-transparent border-b-2 border-gray-500 focus:border-gray-600 focus:bg-transparent hover:border-orange'
											selected={endDate}
											placeholder='Enter date'
											name='endDate'
											onChange={(date) => setEndDate(date)}
										/>
									</div>
									<label className='px-1 text-xs text-gray-500 uppercasehtmlFor='>
										Frequency Per Day
									</label>
									<br />
									<select
										onChange={(e) => setFrequencyPerDay(e.target.value)}
										name='frequencyPerDay'
										id='frequencyPerDay'
                    defaultValue='1'
										className='text-center w-10 dark:bg-gray-200 dark:text-gray-800'>
										<option value='1'>1</option>
										<option value='2'>2</option>
									</select>{' '}
									<div className='flex justify-evenly py-4'>
										<Link
											to={`/wallet`}
											className='text-xs text-green-300 border-2 py-1 px-2 border-green-300 dark:text-gray-500 text-gray-800 dark:border-gray-300'>
											Cancel
										</Link>
										<button
											className='text-xs text-green-300 border-2 py-1 px-2 border-green-300 dark:text-gray-500 dark:border-gray-300 text-gray-800'
											type='submit'>
											Add to Wallet
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

export default AddPillForm;
