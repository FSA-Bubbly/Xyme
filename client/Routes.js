import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import Landing from './components/Landing';
import Wallet from './components/Wallet';
import AddPillForm from './components/AddPillForm';
import Profile from './components/Profile';
import { me } from './store';
import PillCalendar from './components/PillCalendar';
import Camera from './components/Camera';

/**
 * COMPONENT
 */
class Routes extends Component {
	componentDidMount() {
		this.props.loadInitialData();
	}

	render() {
		const { isLoggedIn } = this.props;

		return (
			<div className='p-4 flex-grow bg-nude font-mont text-black'>
				{isLoggedIn ? (
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/wallet' component={Wallet} />
						<Route exact path='/wallet/add-pill' component={AddPillForm} />
						<Route eaxct path='/profile' component={Profile} />
						<Route exact path='/calendar' component={PillCalendar} />
						<Route exact path='/camera' component={Camera} />

						<Redirect to='/' />
					</Switch>
				) : (
					<Switch>
						<Route exact path='/' component={Landing} />
						<Route exact path='/login' component={Login} />
						<Route exact path='/signup' component={Signup} />
					</Switch>
				)}
			</div>
		);
	}
}

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		// Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
		// Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
		isLoggedIn: !!state.auth.id,
	};
};

const mapDispatch = (dispatch) => {
	return {
		loadInitialData() {
			dispatch(me());
		},
	};
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
