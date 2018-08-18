import { GETSUBLEVEL } from '../../utils/types';
import config from '../../config';
export const getPostSub = () => {
    return (dispatch) => {

        dispatch({ type: GETSUBLEVEL.GETSUBLEVEL_REQUEST });
        fetch(`${config.serverSideUrl}:${config.port}/user/subscriptions`, {
            method: 'GET',
        }) 
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.status === 200) {
                    dispatch({
                        type: GETSUBLEVEL.GETSUBLEVEL_SUCCESS,
                        payload: responseJson
                    })
                }
            })
            .catch(error => {
                if (error) {
                    dispatch({ type: GETSUBLEVEL.GETSUBLEVEL_FAILED })
                }
            })
    }
};

