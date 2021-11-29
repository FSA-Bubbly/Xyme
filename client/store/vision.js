import axios from 'axios';
const USE_VISION = 'USE_VISION';

const _checkWithVision = (vision) => ({
	type: USE_VISION,
	vision,
});

export const checkWithVision = (pill) => {
	return async (dispatch) => {
		try {
			let formData = new FormData();
			formData.append('pill', pill);
			for (const value of formData.entries()) {
				console.log(value);
			}
			const { data } = await axios.put(`/api/vision/`, formData);
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
