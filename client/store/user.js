import axios from 'axios';

const UPDATE_USER = 'UPDATE_USER';
const FETCH_UPDATE_USER = 'FETCH_UPDATE_USER';
const UPDATE_SMS = 'UPDATE_SMS';

const _updateUser = (user) => ({
	type: UPDATE_USER,
	user,
});

const _fetchUpdateUser = (user) => ({
	type: FETCH_UPDATE_USER,
	user,
});

const _updateSms = (status) => ({
	type: UPDATE_SMS,
	status,
});

export const updateUser = (user, history) => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem('token');
			const { data } = await axios.put(`/api/users/${user.id}`, user, {
				headers: { authorization: token },
			});
			dispatch(_updateUser(data));
			history.push('/profile');
		} catch (error) {
			console.log(error.response);
			alert(error.response.data);
			console.error(error);
		}
	};
};

export const updateSms = (statusObj) => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem('token');
			const { data } = await axios.put(
				`/api/users/${statusObj.userId}/updatesms`,
				statusObj,
				{
					headers: { authorization: token },
				}
			);
			dispatch(_updateSms(data));
		} catch (error) {
			console.error(error);
		}
	};
};

export const fetchUpdateUser = (userId) => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem('token');
			const { data } = await axios.get(`/api/users/${userId}`, {
				headers: { authorization: token },
			});
			dispatch(_fetchUpdateUser(data));
		} catch (error) {
			console.error(error);
		}
	};
};

export default function (state = {}, action) {
	switch (action.type) {
		case UPDATE_USER:
			return action.user;
		case FETCH_UPDATE_USER:
			return action.user;
		default:
			return state;
	}
}
