    import config from '../../config';
export const genreList = () => {
    return (dispatch) => {
        dispatch({ type: 'GENRE_LIST_REQUEST' });
        fetch(`${config.serverSideUrl}:${config.port}/user/getgenrelist`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.status === 200) {
                    dispatch({
                        type: 'GENRE_LIST_SUCCESS',
                        payload: responseJson
                    })
                }
            })
            .catch(error => {
                if (error) {
                    dispatch({ type: 'GENRE_LIST_FAILED' })
                }
            })
    }
};


