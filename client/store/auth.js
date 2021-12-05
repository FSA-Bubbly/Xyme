import axios from 'axios';
import history from '../history';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
	const token = window.localStorage.getItem(TOKEN);
	console.log('me', token);
	if (token) {
		const res = await axios.get('/auth/me', {
			headers: {
				authorization: token,
			},
		});
		return dispatch(setAuth(res.data));
	}
};

export const authenticate =
	(
		first,
		last,
		age,
		height,
		weight,
		email,
		phone,
		morningReminder,
		nighttimeReminder,
		password,
		avatar,
		method
	) =>
	async (dispatch) => {
		try {
			const res = await axios.post(`/auth/${method}`, {
				first,
				last,
				age,
				height,
				weight,
				email,
				phone,
				morningReminder,
				nighttimeReminder,
				password,
				avatar,
			});
			console.log('authenticate', res.data.token);
			window.localStorage.setItem(TOKEN, res.data.token);

			dispatch(me());
			history.push('/');
		} catch (authError) {
			alert('Incorrect email or password');
			return dispatch(setAuth({ error: authError }));
		}
	};

export const logout = () => {
	window.localStorage.removeItem(TOKEN);
	history.push('/login');
	return {
		type: SET_AUTH,
		auth: {},
	};
};

export let getToken = () => {
	const token = window.localStorage.getItem(TOKEN);
	return token;
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
	switch (action.type) {
		case SET_AUTH:
			return action.auth;
		default:
			return state;
	}
}
