import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addPillToWallet } from '../store/wallet';
import history from '../history';
import DatePicker from 'react-datepicker';
import Camera from './Camera';
const AddPillForm = () => {
	const dispatch = useDispatch();
	const user = useSelector((s) => s.auth);
	const [pillName, setPillName] = useState('');
	const [dosage, setDosage] = useState('');
	const [startDate, setStartDate] = useState(new Date());
	const [expectedNextDate, setExpectedNextDate] = useState(new Date());
	const [frequencyPerDay, setFrequencyPerDay] = useState(0);
	const [frequencyPerWeek, setFrequencyPerWeek] = useState(0);

	console.log(frequencyPerDay);
	console.log(frequencyPerWeek);

	const handleSubmit = (e) => {
		e.preventDefault();
		const pillToAdd = {
			userId: user.id,
			pillName: `${pillName[0].toUpperCase()}${pillName
				.slice(1)
				.toLowerCase()}`,
			dosage,
			startDate,
			expectedNextDate,
			frequencyPerDay,
			frequencyPerWeek,
		};
		dispatch(addPillToWallet(pillToAdd, history));
	};

	return (
		<div>
			<Camera />
			<Link to={'/wallet'}>Cancel</Link>
			<h3>New Pill:</h3>
			<form id='add-pill' onSubmit={handleSubmit}>
				<label htmlFor='pill-name'>Pill Name:</label>
				<input
					name='pill-name'
					value={pillName}
					onChange={(e) => setPillName(e.target.value)}
					placeholder='Enter pill name here'
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
				<label htmlFor=''> When will you be taking the pill next:</label>
				<DatePicker
					selected={expectedNextDate}
					placeholder='Enter date'
					name='expectedNextDate'
					onChange={(date) => setExpectedNextDate(date)}
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
				<label htmlFor=''>Frequency Per Week:</label>
				<select
					onChange={(e) => setFrequencyPerWeek(e.target.value)}
					name='frequencyPerWeek'
					id='frequencyPerWeek'>
					<option value='1'>1</option>
					<option value='2'>2</option>
					<option value='3'>3</option>
					<option value='4'>4</option>
					<option value='5'>5</option>
					<option value='6'>6</option>
					<option value='7'>7</option>
				</select>
				<br />
				<button type='submit'>Add to Wallet</button>
			</form>
		</div>
	);
};

export default AddPillForm;
