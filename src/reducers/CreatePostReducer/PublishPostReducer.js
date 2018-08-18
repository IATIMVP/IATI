import { PUBLISH_POST } from '../../utils/types';
const INITIAL_STATE = {
    isLoading: false,
    error: '',
    publish_post: '',
};
const CreatePost = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PUBLISH_POST.PUBLISH_POST_REQUEST:
            return Object.assign({}, state, {
                isLoading: true,
            });

        case PUBLISH_POST.PUBLISH_POST_SUCCESS:
            return Object.assign({}, state, {
                publish_post: action.payload,
                isLoading: false,
            })

        case PUBLISH_POST.PUBLISH_POST_FAILED:
            return Object.assign({}, state, {
                error: 'ERROR',
                isLoading: false,
            });

        default:
            return state;
    }
};
export default CreatePost;