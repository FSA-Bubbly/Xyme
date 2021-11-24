import axios from "axios";
import history from "../history";

//action types
const GET_WALLET = "GET_WALLET";

//action creators
const getWallet = (pills) => {
  return {
    type: GET_WALLET,
    pills,
  };
};

// thunks
export const fetchWallet = (user) => {
  return async (dispatch) => {
    try {
      console.log(user);
      const response = await axios.get(`/api/wallet`, user);
      dispatch(getWallet(response));
    } catch (error) {
      console.error(error);
    }
  };
};
const initialState = [];

export default function walletReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WALLET:
      return action.pills;
    default:
      return state;
  }
}
