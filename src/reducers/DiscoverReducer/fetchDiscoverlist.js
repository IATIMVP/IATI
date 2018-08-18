



import { FETCHDISCOVERLIST } from '../../utils/types';

const INITIAL_STATE = {
    isLoading: false,
    data:[],
    success:""
};
const fetchDiscoverlist = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCHDISCOVERLIST.REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
                data:[]
            });

        case FETCHDISCOVERLIST.SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                data: action.payload,
                success: "success",
            })

        case FETCHDISCOVERLIST.FAIL:
            return Object.assign({}, state, {
                success: "",
                isLoading: false,
                data:[],
            });
        default:
            return state;
    }
};
export default fetchDiscoverlist;