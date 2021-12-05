import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Landing from './Landing';

/**
 * COMPONENT
 */
export const Home = ({ isLoggedIn }) => {
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
