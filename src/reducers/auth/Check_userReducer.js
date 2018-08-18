import { CHECK_USER, SLOGIN } from '../../utils/types';
const INITIAL_STATE = {
    loading: false,
    isLoading: false,
    check: null,
    socialLogin: '',
    error: '',
    Error: ''
};

function checkuserReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CHECK_USER.CHECK_USER_REQUEST:
            return {
                ...state,
                loading: true,
                check: ''
            }
        case CHECK_USER.CHECK_USER_SUCCESS:
            return {
                ...state,
                check: action.payload,
                loading: false
            }
        case CHECK_USER.CHECK_USER_FAIL:
            return {
                state,
                error: "Unable to fetch data",
                loading: false
            }
        case SLOGIN.SLOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                socialLogin: ''
            }
        case SLOGIN.SLOGIN_SUCCESS:
            return {
                ...state,
                socialLogin: action.payload,
                isLoading: false
            }
        case SLOGIN.SLOGIN_REQUEST_FAIL:
            return {
                state,
                Error: "Unable to fetch data",
                isLoading: false
            }
        default:
            return state;
    }
}

export default checkuserReducer;
