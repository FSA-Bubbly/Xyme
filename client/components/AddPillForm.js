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
	const [dosage, setDosage] = useState('');
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [frequencyPerDay, setFrequencyPerDay] = useState(0);
	const nameRef = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();
		const pillToAdd = {
			userId: user.id,
			pillName: `${pillName[0].toUpperCase()}${pillName
				.slice(1)
				.toLowerCase()}`,
			dosage,
			startDate,
			endDate,
			frequencyPerDay,
		};
		const removePillandInteraction = async () => {
      await dispatch(addPillToWallet(pillToAdd, history));
      dispatch(addInteractions(user));
    }
    removePillandInteraction();
	};

	const retrieveName = (visionPill) => {
		setPillName(visionPill);
		nameRef.current.focus();
	};

	return (
		<div>
			<Camera walletCallBack={retrieveName} />
			<Link to={'/wallet'}>Cancel</Link>
			<h3>New Pill:</h3>
			<form id='add-pill' onSubmit={handleSubmit}>
				<label htmlFor='pill-name'>Pill Name:</label>
				<input
					name='pill-name'
					value={pillName}
					onChange={(e) => setPillName(e.target.value)}
					placeholder='Enter pill name here'
					ref={nameRef}
				/>
				<br />
				<label htmlFor=''>Doseage:</label>
				<input
					name='dosage'
					value={dosage}
					onChange={(e) => setDosage(e.target.value)}
					placeholder='Enter dosage here'
				/>
				<br />
				<label htmlFor=''>Start Date:</label>
				<DatePicker
					selected={startDate}
					placeholder='Enter date'
					onChange={(date) => setStartDate(date)}
				/>
				<br />
				<label htmlFor=''> End Date:</label>
				<DatePicker
					selected={endDate}
					placeholder='Enter date'
					name='endDate'
					onChange={(date) => setEndDate(date)}
				/>
				<br />
				<label htmlFor=''>Frequency Per Day:</label>
				<select
					onChange={(e) => setFrequencyPerDay(e.target.value)}
					name='frequencyPerDay'
					id='frequencyPerDay'>
					<option value='1'>1</option>
					<option value='2'>2</option>
					<option value='3'>3</option>
					<option value='4'>4</option>
				</select>{' '}
				<br />
				<button type='submit'>Add to Wallet</button>
			</form>
		</div>
	);
};

export default AddPillForm;
