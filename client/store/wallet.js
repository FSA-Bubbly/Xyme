import axios from 'axios';
import history from '../history';

//action types
const GET_WALLET = 'GET_WALLET';
const ADD_PILL_TO_WALLET = 'ADD_PILL_TO_WALLET';
const EDIT_PILL = 'EDIT_PILL';
const REMOVE_PILLS = 'REMOVE_PILL';
const DECREASE_DOSAGE = 'DECREASE_DOSAGE';

//action creators
const getWallet = (pills) => {
	return {
		type: GET_WALLET,
		pills,
	};
};

const _addPillToWallet = (pill) => {
	return {
		type: ADD_PILL_TO_WALLET,
		pill,
	};
};

const _editPill = (pill) => {
	return {
		type: EDIT_PILL,
		pill,
	};
};

const _removePills = (pills) => {
	return {
		type: REMOVE_PILLS,
		pills,
	};
};

const _decreaseDosage = (pills) => {
	return {
		type: DECREASE_DOSAGE,
		pills,
	};
};
// thunks
export const fetchWallet = (user) => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem('token');
			const { data: pills } = await axios.get(`/api/wallet/${user.id}`, {
				headers: { authorization: token },
			});
			dispatch(getWallet(pills));
		} catch (error) {
			console.error(error);
		}
	};
};

export const addPillToWallet = (pill) => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem('token');
			const { data } = await axios.post('/api/wallet/add-pill', pill, {
				headers: { authorization: token },
			});
			dispatch(_addPillToWallet(data));
		} catch (error) {
			console.error(error);
			const errMsg = error.response.data.error;
			alert(errMsg);
		}
	};
};

export const editPill = (pill) => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem('token');
			const { data: editedPill } = await axios.put(
				`/api/wallet/pill/edit`,
				{
					pill,
				},
				{ headers: { authorization: token } }
			);
			dispatch(_editPill(editedPill));
			history.push(`/wallet`);
		} catch (error) {
			console.error(error);
		}
	};
};

export const removePills = (userId, pills) => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem('token');
			const { data: removedPills } = await axios.delete(
				`/api/wallet/${userId}/remove`,
				{
					headers: { authorization: token },
					data: {
						pills,
					},
				}
			);
			const asNums = removedPills.map((pillId) => parseInt(pillId));
			dispatch(_removePills(asNums));
		} catch (error) {
			console.error(error);
		}
	};
};

export const decreaseDosage = (userId, pills) => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem('token');
			const { data: updatedPills } = await axios.put(
				'/api/dailypill',
				{
					pills,
					userId,
				},
				{ headers: { authorization: token } }
			);
			const reducedPills = updatedPills.reduce((accumulator, currentVal) => {
				accumulator[currentVal.pillId] = currentVal;
				return accumulator;
			}, {});
			dispatch(_decreaseDosage(reducedPills));
		} catch (error) {
			console.error(error);
		}
	};
};

export default function (state = [], action) {
	switch (action.type) {
		case GET_WALLET:
			return action.pills;
		case ADD_PILL_TO_WALLET:
			return [...state, action.pill];
		case EDIT_PILL:
			return state.map((pill) =>
				pill.id === action.pill.id ? action.pill : pill
			);
		case REMOVE_PILLS:
			return state.filter((pill) => !action.pills.includes(pill.id));
		case DECREASE_DOSAGE:
			return state.map((pill) => {
				if (pill.id in action.pills && pill.wallet.dailyDosage > 0) {
					pill.wallet.dailyDosage--;
				}
				return pill;
			});
		// state
		// 	.map((pill) => {
		// 		if (action.pills.includes(pill.id)) {
		// 			pill.wallet.dailyDosage--;
		// 		}
		// 	})
		// 	.filter((pill) => pill.wallet.dailyDosage > 0);
		default:
			return state;
	}
}
