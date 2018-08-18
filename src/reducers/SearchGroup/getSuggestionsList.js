



import { FETCHSUGGESTIONS } from '../../utils/types';

const INITIAL_STATE = {
    isLoading: false,
    data:[],
    success:""
};
const getSuggestionsList = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCHSUGGESTIONS.REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
                data:[]
            });

        case FETCHSUGGESTIONS.SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                data: action.payload,
                success: "success",
            })

        case FETCHSUGGESTIONS.FAIL:
            return Object.assign({}, state, {
                success: "",
                isLoading: false,
                data:[],
            });
        default:
            return state;
    }
};
export default getSuggestionsList;