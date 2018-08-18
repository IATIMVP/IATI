
import { Actions } from "react-native-router-flux";
import { AsyncStorage } from 'react-native';
import { FETCHSUGGESTIONS} from '../../utils/types';
import  config from "../../config";

export const getSuggestions = (inputData) => {

 
    console.log("inputData",inputData)
  return dispatch => {
   
   dispatch({ type: FETCHSUGGESTIONS.REQUEST })
   let uri =`${config.serverSideUrl}:${config.port}/playlist/suggestions`
   console.log("uri====>",uri)
    fetch(uri, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body:  JSON.stringify(inputData)
    })
      .then(response => response.json())
      .then(responseJson => {
          console.log("response json",responseJson)
      if (responseJson.status === 200){ 
        dispatch({
          type: FETCHSUGGESTIONS.SUCCESS,
          payload: responseJson.data
        })
      }else{
        dispatch({
            type: FETCHSUGGESTIONS.FAIL,
          })
        
      }
      })
      .catch(error => {
        if (error) {
            console.log("response FETCHSUGGESTIONS error",error)
            dispatch({
                type: FETCHSUGGESTIONS.FAIL,
              })
        }
      })
  }
  }