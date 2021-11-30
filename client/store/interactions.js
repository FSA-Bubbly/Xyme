import axios from 'axios';

const GET_INTERACTIONS = 'GET_INTERACTIONS';

const getInteractions = (user) => {
  return {
    type: GET_INTERACTIONS,
    conflicts
  };
};

export const fetchInteractions = (user) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/interactions/${user.id}`);
      // console.log('thunk', data);
    } catch (error) {
      console.error(error);
    }
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case GET_INTERACTIONS:
      return action.conflicts
    default:
      return state;
  }
}
