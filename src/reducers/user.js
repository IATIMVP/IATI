import { LOGIN } from "../utils/types";

// @flow
const INITIAL_STATE = {};

function user(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case LOGIN.LOGIN_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}

export default user;
