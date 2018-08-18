
import { SELECT, SET_USERNAME } from '../utils/types';
const INITIAL_STATE = {
    selectdata: null,
    error: null,
    isloading: false,
    type: null,
    userName: ""
};
const SelectUserNameReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SELECT.SELECTREQUEST:
            return Object.assign({}, state, {
                selectdata: null,
                error: null,
                type: action.check,
                isloading: true
            });

        case SELECT.SELECTSUCCESS:
            return Object.assign({}, state, {

                selectdata: action.Data,
                type: action.check,
                isloading: false
            })

        case SELECT.SELECTFAILURE:
            return Object.assign({}, state, {
                error: action.Data,
                type: action.check,
                isloading: false
            });
        case SET_USERNAME:
            return Object.assign({}, state, {
                userName: action.payload,
                isloading: false
            })

        default:
            return state;
    }
};
export default SelectUserNameReducer;
