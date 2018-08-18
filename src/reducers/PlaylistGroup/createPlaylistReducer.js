
import { CREATE_PLAYLIST } from '../../utils/types';

const INITIAL_STATE = {
    isLoading: false,
    data:null,
    success:""
};
const createPlaylistReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CREATE_PLAYLIST.REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
                data:null
            });

        case CREATE_PLAYLIST.SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                data:action.data,
                success:"success",
            })

        case CREATE_PLAYLIST.FAIL:
            return Object.assign({}, state, {
                success:"",
                isLoading: false,
                data:null,
            });
        default:
            return state;
    }
};
export default createPlaylistReducer;