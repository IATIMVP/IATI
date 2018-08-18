import { SET_AGE, SET_GENDER } from '../utils/types';

const INITIAL_STATE = {
    userAge: null,
    userGender: null
};
const setInfo = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_AGE:
            return Object.assign({}, state, {
                userAge: action.payload,
            });
        case SET_GENDER:
            return Object.assign({}, state, {
                userGender: action.payload,
            });
        default:
            return state;
    }
};
export default setInfo;