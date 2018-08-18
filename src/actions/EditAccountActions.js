import { Actions } from "react-native-router-flux";
import { EDIT_ACCOUNT, LOGIN } from '../utils/types';
import config from "./../config";
export const editAccount = (inputData) => {
  return dispatch => {
    const user = new FormData();
    user.append('file', {
      uri: inputData.file,
      type: 'image/jpg',
      name: `${inputData.name}.jpg`,  
      });
    user.append('name',inputData.name);
    user.append('username', inputData.username);
    user.append('genre', inputData.genre);
    user.append('charge', inputData.charge);
    user.append('subsription', inputData.subsription);
    user.append('fieldId', inputData.fieldId);
   dispatch({ type: EDIT_ACCOUNT.EDIT_ACCOUNT_REQUEST })
    fetch((`${config.serverSideUrl}:${config.port}/user/editAccount`), {
      method: 'POST',
      body:  user
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status === 200){ 

      console.log("respnse from edit api : ", responseJson)

        dispatch({
          type: EDIT_ACCOUNT.EDIT_ACCOUNT_SUCCESS,
          payload: responseJson
        })
        dispatch({
          type: LOGIN.LOGIN_SUCCESS,
          payload: responseJson
        });
        Actions.CreatePost()
      }
      })
      .catch(error => {
        if (error) {
          console.log(error)
          dispatch({ type: EDIT_ACCOUNT.EDIT_ACCOUNT_FAIL })
        }
      })
  }
}
