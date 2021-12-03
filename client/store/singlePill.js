import axios from 'axios';
import { getToken } from './auth';

const GET_SINGLE_PILL = 'GET_SINGLE_PILL';

const _getPill = (pill) => {
	return {
		type: GET_SINGLE_PILL,
		singlePill: pill,
	};
};

export const fetchSinglePill = (pillId) => {
	return async (dispatch) => {
		try {
      const token = window.localStorage.getItem('token');
			const response = await axios.get(`/api/wallet/select/${pillId}`, {
				headers: { authorization: token },
			});
			const singlePill = response.data;
			dispatch(_getPill(singlePill));
		} catch (error) {
			console.error(error);
		}
	};
};

export default function singlePillReducer(state = {}, action) {
	switch (action.type) {
		case GET_SINGLE_PILL:
			return action.singlePill;
		default:
			return state;
	}
}
