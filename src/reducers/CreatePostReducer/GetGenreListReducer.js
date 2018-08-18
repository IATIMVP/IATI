import { RENDERGENRE, SET_GENRE } from '../../utils/types';

const INITIAL_STATE = {
    isLoading: false,
    error: '',
    genere_list: [],
};
const getGenres = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RENDERGENRE.GENRE_LIST_REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
                genere_list: []
            });

        case RENDERGENRE.GENRE_LIST_SUCCESS:
            return Object.assign({}, state, {
                genere_list: JSON.parse(JSON.stringify(action.payload)),
                isLoading: false,
            })

        case RENDERGENRE.GENRE_LIST_FAILED:
            return Object.assign({}, state, {
                error: 'ERROR',
                isLoading: false,
            });
        default:
            return state;
    }
};
export default getGenres;