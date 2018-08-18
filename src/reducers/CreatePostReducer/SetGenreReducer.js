import { SET_GENRE, SET_PRIVACY } from '../../utils/types';

const INITIAL_STATE = {
    data: "",
    privacy: ""
};
const setGenres = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_GENRE:
            return Object.assign({}, state, {
                data: (action.payload),
            });
        case SET_PRIVACY:
            return Object.assign({}, state, {
                privacy: action.payload,
            });
        default:
            return state;
    }
};
export default setGenres;