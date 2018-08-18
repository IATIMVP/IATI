

import { FETCHPLAYLIST } from '../../utils/types';

const INITIAL_STATE = {
    isLoading: false,
    data:[],
    success:""
};
const fetchPlaylistData = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCHPLAYLIST.REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
                data:[]
            });

        case FETCHPLAYLIST.SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                data: action.payload,
                success: "success",
            })

        case FETCHPLAYLIST.FAIL:
            return Object.assign({}, state, {
                success: "",
                isLoading: false,
                data:[],
            });
        default:
            return state;
    }
};
export default fetchPlaylistData;