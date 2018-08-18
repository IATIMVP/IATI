import { GENRELIST } from '../utils/types';
import config from '../config';
export const genreData = (page,data) => {
    let store_data
    if(data){
         store_data = data;
    }
    else{
         store_data = [];
    }
    return (dispatch) => {
        dispatch({ type: GENRELIST.GENRE_DATA_REQUEST });
        fetch(`${config.serverSideUrl}:${config.port}/user/genrelist/${JSON.stringify(page)}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(responseJson => {

                if (responseJson.status === 200) {
                    responseJson.message.map((item,index)=>{
                        store_data.push(item);
                    })
                    dispatch({
                        type: GENRELIST.GENRE_DATA_SUCCESS,
                        payload: store_data
                    })
                }
            })
            .catch(error => {
                if (error) {
                    dispatch({ type: GENRELIST.GENRE_DATA_FAILED })
                }
            })
    }
};



