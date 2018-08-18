import { SET_LEVEL } from '../../utils/types';

const INITIAL_STATE = {
    data: "",
};
const setSubLevel = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_LEVEL:
            return Object.assign({}, state, {
                data: action.payload,
            });
        default:
            return state;
    }
};
export default setSubLevel;