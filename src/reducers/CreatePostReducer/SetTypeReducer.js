import { SET_TYPE} from '../../utils/types';

const INITIAL_STATE = {
    types: "",
};
const setTypes = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_TYPE:
            return Object.assign({}, state, {
                types: action.payload,
            });
        default:
            return state;
    }
};
export default setTypes;