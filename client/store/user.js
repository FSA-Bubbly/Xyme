import axios from "axios";

const UPDATE_USER = 'UPDATE_USER';

const _updateUser = user => ({
  type: UPDATE_USER,
  user
});

export const updateUser = user => {
  return async dispatch => {
    try {
      const { data } = await axios.put(
        `/api/users/${user.id}`,
        user
      )
      dispatch(_updateUser(data))
    } catch (error) {
      console.error(error);
    }
  }
};

export default function (state = {}, action) {
  switch (action.type) {
    case UPDATE_USER:
      return action.user;
    default:
      return state;
  }
};
