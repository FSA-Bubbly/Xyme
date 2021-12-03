import axios from "axios";
import history from "../history";

const TOKEN_NAME = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

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

export const authenticate =
	(first, last, age, height, weight, email, phone, morningReminder, nighttimeReminder, password, avatar, method) =>
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

export let getToken = () => {
	return window.localStorage.getItem(TOKEN_NAME);
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
