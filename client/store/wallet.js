import axios from "axios";
import history from "../history";

//action types
const GET_WALLET = "GET_WALLET";
const ADD_PILL_TO_WALLET = "ADD_PILL_TO_WALLET";
const REMOVE_PILLS = 'REMOVE_PILL';

//action creators
const getWallet = pills => {
  return {
    type: GET_WALLET,
    pills,
  };
};

const _addPillToWallet = pill => {
  return {
    type: ADD_PILL_TO_WALLET,
    pill
  }
};

const _removePills = pills => {
  return {
    type: REMOVE_PILLS,
    pills
  }
};

// thunks
export const fetchWallet = user => {
  return async dispatch => {
    try {
      const { data: pills } = await axios.get(`/api/wallet/${user.id}`);
      dispatch(getWallet(pills));
    } catch (error) {
      console.error(error);
    }
  }
}

export const addPillToWallet = (pill, history) => {
  return async dispatch => {
    try {
      const { data: addedPill } = await axios.post(
        '/api/wallet/add-pill', pill);
      dispatch(_addPillToWallet(addedPill));
      history.push('/wallet');
    } catch (error) {
      console.error(error);
      alert(
        'This medication does not exist!'
      )
    }
  }
}

export const removePills = (userId, pills) => {
  return async dispatch => {
    try {
      const { data: removedPills } = await axios.delete(
        `/api/wallet/${userId}/remove`,
      {
        // headers for authorization here,
        data: {
          pills
        }
      });
      const asNums = removedPills.map(pillId => parseInt(pillId));
      dispatch(_removePills(asNums));
    } catch (error) {
      console.error(error);
    }
  }
}

export default function (state = [], action) {
  switch (action.type) {
    case GET_WALLET:
      return action.pills;
    case ADD_PILL_TO_WALLET:
      return [...state, action.pill]
    case REMOVE_PILLS:
      return state.filter(pill => !action.pills.includes(pill.id))
    default:
      return state;
  }
}
