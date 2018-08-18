import { LOGIN, SWITCH_PROFILE } from '../../utils/types';
const INITIAL_STATE = {
  loading: false,
  loginData: null,
  error: '',
  userType : "",
  switchLoading : false
};

function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN.LOGIN_REQUEST:
      return Object.assign({}, state, { loading: true, error: '', loginData: "" });

    case LOGIN.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loginData: action.payload,
        loading: false,
        userType : action.payload.data.role 
      });

    case LOGIN.LOGIN_REQUEST_FAIL:
      return Object.assign({}, state, {
          error: "Enable to fetch data",
        loading: false
      }); 

      case SWITCH_PROFILE.REQUEST:
      return Object.assign({}, state, {
         switchLoading : true,
      }); 

      case SWITCH_PROFILE.SUCCESS:
      return Object.assign({}, state, {
         switchLoading : false,
        loginData: action.payload,
        userType : action.payload.data.role 
      }); 

      case SWITCH_PROFILE.FAIL:
      return Object.assign({}, state, {
         switchLoading : false,
      }); 

    default:
      return state;
  }
}

export default loginReducer;
