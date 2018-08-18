import { SET_LEVEL} from '../../utils/types';

export function setLevel(data) {
    return (dispatch) => {
    dispatch({
        type: SET_LEVEL,
        payload: data,
    });
}
}