

import { Actions } from "react-native-router-flux";
import { AsyncStorage } from 'react-native';
import {  COMMONALERT,FETCHDATALIST} from '../../utils/types';
import  config from "../../config";

export const getDetails = (keyword,_id) => {
  
let obj ={
    user_id:_id,
    keyword:keyword
}


  return dispatch => {
   
   dispatch({ type: FETCHDATALIST.REQUEST })
   let uri =`${config.serverSideUrl}:${config.port}/playlist/search_songs`
   console.log("uri====>",uri)
   console.log("obj",obj)
    fetch(uri, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body:  JSON.stringify(obj)
    })
      .then(response => response.json())
      .then(responseJson => {

          console.log("response json fetch SEARCH",responseJson)
        if (responseJson.status === 200){ 
        dispatch({
          type: FETCHDATALIST.SUCCESS,
          payload: responseJson.data
        })
        
      }else{
        dispatch({
            type: FETCHDATALIST.FAIL,
          })
          dispatch({
            type:COMMONALERT.SUCCESS, 
            errorMsg:"Some error occured!",
            errorStatus: true,         
          });
      }
      })
      .catch(error => {
        if (error) {
            console.log("response error",error)
            dispatch({
                type: FETCHDATALIST.FAIL,
              })
        }
      })
  }
}