import axios from "axios";

const SET_USER = "SET_USER";
const REMOVE_USER = "REMOVE_USER";

export const setUser = (user) => ({ type: SET_USER, user });
export const removeUser = () => ({ type: REMOVE_USER });

export default function (state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    case REMOVE_USER:
      return {};
    default:
      return state;
  }
}
