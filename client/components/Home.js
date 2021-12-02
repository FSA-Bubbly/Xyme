import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Landing from './Landing';

/**
 * COMPONENT
 */
export const Home = ({ isLoggedIn }) => {
	return (
		<div>
			{isLoggedIn ? (
				<Landing />
			) : (
				<Landing>
					<h3>Welcome, {email}</h3>
				</Landing>
			)}
			<Link to='/camera'>Camera</Link>
		</div>
	);
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
