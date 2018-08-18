import { SET_SUB } from '../../utils/types';

const INITIAL_STATE = {
    data: "",
};
const setSubscription = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_SUB:
            return Object.assign({}, state, {
                data: action.payload,
            });
        default:
            return state;
    }
};
export default setSubscription;