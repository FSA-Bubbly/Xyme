import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPillToWallet } from "../store/wallet";
import history from "../history";

const AddPillForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth);
  const [pillName, setPillName] = useState("");
  const [dosage, setDosage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const pillToAdd = { userId: user.id, pillName, dosage };
    dispatch(addPillToWallet(pillToAdd, history));
  };

  return (
    <div>
      <Link to={"/wallet"}>Cancel</Link>
      <h3>New Pill:</h3>
      <form id='add-pill' onSubmit={handleSubmit}>
        <label htmlFor='pill-name'>Pill Name:</label>
        <input
          name='pill-name'
          value={pillName}
          onChange={(e) => setPillName(e.target.value)}
          plateholder='Enter pill name here'
        />
        <br />

        <label htmlFor=''>Doseage:</label>
        <input
          name='dosage'
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
          plateholder='Enter dosage here'
        />
        <br />

        <button type='submit'>
          {" "}
          <Link
            to='/wallet'
            className='py-5 px-3 text-black hover:text-gray-900 u'
          >
            add to wallet
          </Link>
        </button>
      </form>
    </div>
  );
};

export default AddPillForm;
