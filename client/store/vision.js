import axios from 'axios';
const USE_VISION = 'USE_VISION';

const _checkWithVision = (vision) => ({
	type: USE_VISION,
	vision,
});

export const checkWithVision = (pill) => {
	return async (dispatch) => {
		try {
			console.log('check', pill);
			const { data } = await axios.put(`/api/vision/`, { data: { pill } });

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
