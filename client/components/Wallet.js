import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWallet } from "../store/wallet";

const Wallet = () => {
  const { auth: user, wallet: { data: pills } } = useSelector(s => s);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWallet(user));
  }, []);

  return (
    <div>
      {
        pills === undefined ? (
          <h1>Loading...</h1>
        ) : (
          <div className='walletContainer'>
            <Link to='/wallet/add-pill'>
              Add Pill
            </Link>
            <h1>currently taking</h1>
            {pills.map((pill) => (
              <div key={pill.id} className='furniture-item'>
                <div class='m-9'></div>
                <p>{pill.name}(50mg)</p>
                <p>{pill.description} </p>
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
};

export default Wallet;
