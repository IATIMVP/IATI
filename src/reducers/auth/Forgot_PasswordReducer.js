import { FORGOT_PASSWORD } from '../../utils/types';
const INITIAL_STATE = {
  loading: false,
  reset_mailData: "",
  error: ""
};

function forgotpasswordReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case FORGOT_PASSWORD.FORGOT_PASSWORD_REQUEST:
      return Object.assign({}, state, { loading: true, reset_mailData: '', error: '' });
    case FORGOT_PASSWORD.FORGOT_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        reset_mailData: action.payload,
        loading: false
      });
    case FORGOT_PASSWORD.FORGOT_PASSWORD_FAIL:
      return Object.assign({}, state, {
        error: "Unable to fetch data",
        loading: false
      });
    default:
      return state;
  }
}

export default forgotpasswordReducer;
