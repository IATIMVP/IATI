import config from '../../config';
export const getTypes = () => {
    return (dispatch) => {
        dispatch({ type: 'GENRE_TYPE_REQUEST' });
        fetch(`${config.serverSideUrl}:${config.port}/user/gettypeslist`, {
            method: 'GET',
        }) 
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.status === 200) {
                    dispatch({
                        type: 'GENRE_TYPE_SUCCESS',
                        payload: responseJson
                    })
                }
            })
            .catch(error => {
                if (error) {
                    dispatch({ type: 'GENRE_TYPE_FAILED' })
                }
            })
    }
};
