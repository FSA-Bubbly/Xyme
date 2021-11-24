import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const AddPillForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const pillToAdd = {name, dosage}
    console.log(pillToAdd)
    dispatch()
  }

  return (
    <div>
      <Link to={'/wallet'}>
        Cancel
      </Link>
      <h3>New Pill:</h3>
      <form id='add-pill' onSubmit={handleSubmit}>
        <label htmlFor='name'>Pill Name:</label>
        <input
          name='name'
          value={name}
          onChange={e => setName(e.target.value)}
          plateholder='Enter pill name here'
        />
        <br />

        <label htmlFor=''>Doseage:</label>
        <input
          name='dosage'
          value={dosage}
          onChange={e => setDosage(e.target.value)}
          plateholder='Enter dosage here'
        />
        <br />

        <button type='submit'>Add to Wallet</button>
      </form>
    </div>
  )
}

export default AddPillForm;
