import axios from 'axios';

const GET_INTERACTIONS = 'GET_INTERACTIONS';

const getInteractions = (interactions) => {
  return {
    type: GET_INTERACTIONS,
    interactions
  };
};

export const fetchInteractions = (user) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/interactions/${user.id}`);
      dispatch(getInteractions(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case GET_INTERACTIONS:
      return action.interactions
    default:
      return state;
  }
}
