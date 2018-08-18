import { SET_SUB} from '../../utils/types';
import { Actions } from 'react-native-router-flux';
export function setSub(data) {
    return (dispatch) => {
    
        if(data){
    dispatch({
        type: SET_SUB,
        payload: data,
    });
    Actions.ArtistLogin()
   
}
}
}