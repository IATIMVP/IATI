import { COMMONALERT } from "./../../utils/types";
const INITIAL_STATE = {

    isLoading :false,
    success : "",
    data :null,
    errorStatus:true,
};

function CommonAlertReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
      case COMMONALERT.REQUEST:

      return Object.assign({}, state, {
        isLoading : true,
      });

    case COMMONALERT.SUCCESS:
    return Object.assign({}, state, {
      isloading :false,     
      data : action.errorMsg,
      errorStatus: action.errorStatus
    });

    case COMMONALERT.FAIL:
        
      return Object.assign({}, state, {
        isloading :false
      });

    default:
      return state;
  }
}

export default CommonAlertReducer;
