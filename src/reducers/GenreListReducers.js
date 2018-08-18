import { GENRELIST } from '../utils/types';

const INITIAL_STATE = {
    isLoading: false,
    error: '',
    list_data: null,
};
const GenreListReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GENRELIST.GENRE_DATA_REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
                list_data: null,
            });

        case GENRELIST.GENRE_DATA_SUCCESS:
            return Object.assign({}, state, {
                list_data: JSON.parse(JSON.stringify(action.payload)),
                isLoading: false,
            })

        case GENRELIST.GENRE_DATA_FAILED:
            return Object.assign({}, state, {
                error: 'ERROR',
                isLoading: null,
            });
        default:
            return state;
    }
};
export default GenreListReducers;
