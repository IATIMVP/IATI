import { EDIT_POST } from '../utils/types';
const INITIAL_STATE = {
    isLoading: false,
    error: '',
    edit_post: '',
};
const UpdatePost = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EDIT_POST.EDIT_POST_REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
            });

        case EDIT_POST.EDIT_POST_SUCCESS:
            return Object.assign({}, state, {
                edit_post: action.payload,
                isLoading: false,
            })

        case EDIT_POST.EDIT_POST_FAILED:
            return Object.assign({}, state, {
                error: 'ERROR',
                isLoading: false,
            });

        default:
            return state;
    }
};
export default UpdatePost;