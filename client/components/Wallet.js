import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Wallet = (props) => {
  const wallet = useSelector((state) => state.wallet);
  useEffect(() => {
    dispatch(fetchPills());
  }, [wallet]);
  return <div className="walletContainer"></div>;
};

export default Wallet;
