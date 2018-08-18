import { EDIT_ACCOUNT } from './../utils/types';
const INITIAL_STATE = {
  loading: false,
  editAccountdata: null,
  error: ''
};

function editAccountReducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case EDIT_ACCOUNT.EDIT_ACCOUNT_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: '',
        editAccountdata: ""
      });
    case EDIT_ACCOUNT.EDIT_ACCOUNT_SUCCESS:
      return Object.assign({}, state, {
        editAccountdata: action.payload,
        loading: false
      });
    case EDIT_ACCOUNT.EDIT_ACCOUNT_FAIL:
      return Object.assign({}, state, {
        error: "Enable to fetch data",
        loading: false
      });
    default:
      return state;
  }
}

export default editAccountReducer;
