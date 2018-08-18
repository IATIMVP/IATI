import { EDIT_POST } from '../../utils/types';
import config from '../../config';
import { Actions } from 'react-native-router-flux';
export const editPost = (inputData) => {
    return (dispatch) => {
        const user = new FormData();
        user.append('file', {
            uri: inputData.file,
            type: 'image/jpg',
            name: `${inputData.name}.jpg`,
        });
        user.append('title', inputData.title);
        user.append('description', inputData.description);
        user.append('genre', inputData.genre);
        user.append('genre_type', inputData.genre_type);
        user.append('privacy', inputData.privacy);
        user.append('charge', inputData.charge);
        user.append('fieldId', inputData.fieldId);
      
        dispatch({ type: EDIT_POST.EDIT_POST_REQUEST });
        fetch(`${config.serverSideUrl}:${config.port}/user/updatePost`, {
            method: "POST",
            body:user
        })

            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.status === 200) {
                    dispatch({
                        type: EDIT_POST.EDIT_POST_SUCCESS,
                        payload: responseJson
                    })
                }
            })
            .catch(error => {
                if (error) {
                    dispatch({ type: EDIT_POST.EDIT_POST_FAILED })
                }
            })
    }
};
