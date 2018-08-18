import { SET_AGE,SET_GENDER} from '../utils/types';
import { Actions } from "react-native-router-flux";

export function setAge(data) {
    return (dispatch) => {
    dispatch({
        type: SET_AGE,
        payload: data,
    });
}
}
export function setGender(data) {
    return (dispatch) => {
    dispatch({
        type: SET_GENDER,
        payload: data,
    });
}
}