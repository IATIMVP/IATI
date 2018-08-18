// @flow
const INITIAL_STATE = {};

function appState(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return action.payload;
    default:
      return state;
  }
}

export default appState;
