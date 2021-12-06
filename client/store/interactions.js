import axios from 'axios';
import history from "../history";
import { getToken } from './auth';

const GET_INTERACTIONS = 'GET_INTERACTIONS';
const ADD_INTERACTIONS = 'ADD_INTERACTIONS';
const REMOVE_INTERACTIONS = 'REMOVE_INTERACTIONS';

const getInteractions = (interactions) => {
	return {
		type: GET_INTERACTIONS,
		interactions,
	};
};

const _addInteractions = (interactions) => {
  return {
    type: ADD_INTERACTIONS,
    interactions
  }
}

const _removeInteractions = (interactions) => {
  return {
    type: REMOVE_INTERACTIONS,
    interactions
  }
}

export const fetchInteractions = (user) => {
	return async (dispatch) => {
		try {
      const token = window.localStorage.getItem('token');
			const { data } = await axios.get(`/api/interactions/${user.id}`, {
				headers: { authorization: token },
			});
			dispatch(getInteractions(data));
		} catch (error) {
			console.error(error);
		}
	};
};

export const addInteractions = (user, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data } = await axios.post(`/api/interactions`, user, {
        headers: { authorization: token }
      });
      dispatch(_addInteractions(data));
      history.push('/wallet');
    } catch (error) {
      console.error(error);
    }
  }
}

export const removeInteractions = (userId, pills) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data } = await axios.delete(`/api/interactions/remove`, {
        headers: { authorization: token },
        data: {
          userId,
          pills
        }
      })
      dispatch(_removeInteractions(data));
    } catch (error) {
      console.error(error);
    }
  }
}

export default function (state = [], action) {
  switch (action.type) {
    case GET_INTERACTIONS:
      return action.interactions
    case ADD_INTERACTIONS:
      return state
    case REMOVE_INTERACTIONS:
      return state.filter((interaction) => !action.interactions.includes(interaction.id));
    default:
      return state;
  }
}
