import { GETSUBLEVEL } from '../../utils/types';
const INITIAL_STATE = {
    isLoading: false,
    error: '',
    getSub: '',
};
const getSubList = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GETSUBLEVEL.GETSUBLEVEL_REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
            });

        case GETSUBLEVEL.GETSUBLEVEL_SUCCESS:
            return Object.assign({}, state, {
                getSub: action.payload,
                isLoading: false,
            })

        case GETSUBLEVEL.GETSUBLEVEL_FAILED:
            return Object.assign({}, state, {
                error: 'ERROR',
                isLoading: false,
            });

        default:
            return state;
    }
};
export default getSubList;