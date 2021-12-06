import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Landing from './Landing';
import { fetchWallet } from "../store/wallet";
import { fetchInteractions } from "../store/interactions";

/**
 * COMPONENT
 */
export const Home = ({ isLoggedIn }) => {
	const { auth: user } = useSelector((s) => s);
	const dispatch = useDispatch();

	useEffect(() => {
    dispatch(fetchWallet(user));
		dispatch(fetchInteractions(user));
  }, []);

	console.log('Home', isLoggedIn);
	return <div>{isLoggedIn ? <h1>Welcome</h1> : <Landing />}</div>;
};

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		email: state.auth.email,
		isLoggedIn: !!state.auth.id,
	};
};

export default connect(mapState)(Home);
