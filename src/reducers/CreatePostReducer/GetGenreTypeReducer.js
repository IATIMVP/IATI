import { RENDERGENRETYPE, SET_GENRE } from '../../utils/types';

const INITIAL_STATE = {
    isLoading: false,
    error: '',
    genere_type: [],
};
const genreTypeList = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RENDERGENRETYPE.GENRE_TYPE_REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
            });

        case RENDERGENRETYPE.GENRE_TYPE_SUCCESS:
            return Object.assign({}, state, {
                genere_type: JSON.parse(JSON.stringify(action.payload)),
                isLoading: false,
            })

        case RENDERGENRETYPE.GENRE_TYPE_FAILED:
            return Object.assign({}, state, {
                error: 'ERROR',
                isLoading: false,
            });

        default:
            return state;
    }
};
export default genreTypeList;