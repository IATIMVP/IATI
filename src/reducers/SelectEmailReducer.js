
import { SELECTEMAIL } from '../utils/types';
const INITIAL_STATE = {
    selectemail: null,
    error: null,
    isloading: false,

};
const SelectEmailReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SELECTREQUEST':
            return Object.assign({}, state, {
                selectemail: null,
                error: null,
                isloading: true
            });

        case 'SELECTSUCCESS':
            return Object.assign({}, state, {

                selectemail: action.Data,
                isloading: false
            })

        case 'SELECTFAILURE':
            return Object.assign({}, state, {
                error: action.Data,
                isloading: false
            });

        default:
            return state;
    }
};
export default SelectEmailReducer;
