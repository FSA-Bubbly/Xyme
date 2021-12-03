import axios from 'axios';
const USE_VISION = 'USE_VISION';
import { getToken } from './auth';

const token = getToken();

export const _checkWithVision = (vision) => ({
	type: USE_VISION,
	vision,
});

export const checkWithVision = (pill) => {
	return async (dispatch) => {
		try {
			const formData = new FormData();
			formData.append('file', pill);
			const { data } = await axios.post(`/api/vision/`, formData, {
				headers: { authorization: token },
			});
			dispatch(_checkWithVision(data));
		} catch (error) {
			console.error(error);
		}
	};
};

export default function (state = [], action) {
	switch (action.type) {
		case USE_VISION:
			return action.vision;
		default:
			return state;
	}
}
