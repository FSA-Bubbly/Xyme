import axios from "axios";
import history from "../history";

const UPDATE_USER = "UPDATE_USER";
const FETCH_UPDATE_USER = "FETCH_UPDATE_USER";

const _updateUser = (user) => ({
  type: UPDATE_USER,
  user,
});

const _fetchUpdateUser = (user) => ({
  type: FETCH_UPDATE_USER,
  user,
});

export const updateUser = (user, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/users/${user.id}`, user);
      dispatch(_updateUser(data));
      history.push("/profile");
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchUpdateUser = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${userId}`);
      dispatch(_fetchUpdateUser(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export default function (state = {}, action) {
  switch (action.type) {
    case UPDATE_USER:
      return action.user;
    case FETCH_UPDATE_USER:
      return action.user;
    default:
      return state;
  }
}
