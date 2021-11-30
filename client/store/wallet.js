import axios from "axios";
import history from "../history";

//action types
const GET_WALLET = "GET_WALLET";
const ADD_PILL_TO_WALLET = "ADD_PILL_TO_WALLET";

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

// thunks
export const fetchWallet = (user) => {
  return async (dispatch) => {
    try {
      const pills = await axios.get(`/api/wallet/${user.id}`);
      dispatch(getWallet(pills));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addPillToWallet = (pill, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/wallet/add-pill", pill);
      dispatch(_addPillToWallet(data));
      history.push("/wallet");
    } catch (error) {
      console.error(error);
      alert("This medication does not exist!");
    }
  };
};

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_WALLET:
      return action.pills;
    case ADD_PILL_TO_WALLET:
      return action.pill;
    default:
      return state;
  }
}
