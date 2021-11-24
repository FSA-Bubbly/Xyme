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
      <Link to='/wallet/add-pill'>
        Add Pill
      </Link>
      <h1>currently taking</h1>
      {user.pills.map((pill) => (
        <div key={pill.id} className='furniture-item'>
          <div class='m-9'></div>
          <p>{pill.name}(50mg)</p>
          <p>{pill.desciption} </p>
        </div>
      ))}
    </div>
  );
};

export default Wallet;
