import { SET_GENRE,SET_TYPE,SET_PRIVACY} from '../../utils/types';
import {Actions} from "react-native-router-flux"
export function setGenre(data) {
    return (dispatch) => {
    dispatch({
        type: SET_GENRE,
        payload: data,
    });
    Actions.pop()
}
}
export function setType(types) {

    return (dispatch) => {
    dispatch({
        type: SET_TYPE,
        payload: types,
    });
    Actions.pop()
 
}
}
export function setPrivacy(privacy) {
    return (dispatch) => {
    dispatch({
        type: SET_PRIVACY,
        payload: privacy,
    });
}
}