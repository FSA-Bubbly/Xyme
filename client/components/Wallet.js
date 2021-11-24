import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchWallet } from "../store/wallet";

const Wallet = (props) => {
  const user = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWallet(user));
  }, []);
  return (
    <div className='walletContainer'>
      <h1>currently taking</h1>
      {user.pills.map((pill) => (
        <div key={pill.id} className='furniture-item'>
          <div className='m-9'></div>
          <p>{pill.name}(50mg)</p>
          <p>{pill.desciption} </p>
        </div>
      ))}
      <button className='bg-white hover:bg-blue-700 text-black py-2 px-4 rounded-full'>
        add to wallet
      </button>
    </div>
  );
};

export default Wallet;
