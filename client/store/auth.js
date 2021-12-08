import axios from 'axios';
import history from '../history';

const TOKEN_NAME = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';
const SEND_RESET_LINK = 'SEND_RESET_LINK';
const SAVE_NEW_PASSWORD = 'SAVE_NEW_PASSWORD';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });
const _sendResetLink = (reset) => ({
	type: SEND_RESET_LINK,
	reset,
});
const _saveNewPassword = (reset) => ({
	type: SAVE_NEW_PASSWORD,
	reset,
});

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
	const token = window.localStorage.getItem(TOKEN_NAME);
	if (token) {
		const res = await axios.get('/auth/me', {
			headers: {
				authorization: token,
			},
		});
		return dispatch(setAuth(res.data));
	}
};

export const authenticate = (user) => async (dispatch) => {
	try {
		const {
			first,
			last,
			age,
			height,
			weight,
			email,
			sms,
			phone,
			morningReminder,
			nighttimeReminder,
			password,
			avatar,
			formName,
		} = user;
		const res = await axios.post(`/auth/${formName}`, {
			first,
			last,
			age,
			height,
			weight,
			email,
			sms,
			phone,
			morningReminder,
			nighttimeReminder,
			password,
			avatar,
		});
		window.localStorage.setItem(TOKEN_NAME, res.data.token);
		dispatch(me());
		history.push('/');
	} catch (authError) {
		return dispatch(setAuth({ error: authError }));
	}
};

export const logout = () => {
	window.localStorage.removeItem(TOKEN_NAME);
	history.push('/login');
	return {
		type: SET_AUTH,
		auth: {},
	};
};

export const sendResetLink = (body) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.post(`/auth/forgot`, body);
			dispatch(_sendResetLink(data));
		} catch (error) {
			console.error(error);
		}
	};
};

export const saveNewPassword = (body, history) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.put(`/auth/reset/${body.id}`, body);
			dispatch(_saveNewPassword(data));
			history.push('/login');
		} catch (error) {
			console.error(error);
		}
	};
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
