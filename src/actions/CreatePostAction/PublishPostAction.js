import { PUBLISH_POST } from '../../utils/types';
import {
    Alert,
    AsyncStorage    
  } from "react-native";
import config from '../../config';
import { Actions,ActionConst } from 'react-native-router-flux';
export const publishPost = (inputData) => {
    console.log("token : ", inputData.token);
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
        user.append('user_id',inputData.userId);
        console.log("input to publish api : ", user)
        dispatch({ type: PUBLISH_POST.PUBLISH_POST_REQUEST });
        fetch(`${config.serverSideUrl}:${config.port}/user/create`, {
            method: "POST",
            body:user,
            headers :{
                "token" : inputData.token
            }
          
        })

            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.status === 200) {
                    console.log("repsone from publish post api :", responseJson)
                    dispatch({
                        type: PUBLISH_POST.PUBLISH_POST_SUCCESS,
                        payload: responseJson
                    })
                    Actions.introscreen({type: ActionConst.RESET})
                }else{
                    AsyncStorage.removeItem('asyncLoginData');
                    Actions.introscreen({ type: 'reset' })
                    alert(responseJson.msg)
                }
            })
            .catch(error => {
                if (error) {
                    dispatch({ type: PUBLISH_POST.PUBLISH_POST_FAILED })
                }
            })
    }
};


