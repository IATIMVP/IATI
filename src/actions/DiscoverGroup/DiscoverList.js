

import { Actions } from "react-native-router-flux";
import { AsyncStorage } from 'react-native';
import {  COMMONALERT,FETCHDISCOVERLIST} from '../../utils/types';
import  config from "../../config";

export const DiscoverList = (_id,keyword) => {
  
let obj ={
    user_id:_id,
    keyword:keyword
}


  return dispatch => {
   
   dispatch({ type: FETCHDISCOVERLIST.REQUEST })
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

          console.log("response json fetch discover",responseJson)
        if (responseJson.status === 200){ 
        dispatch({
          type: FETCHDISCOVERLIST.SUCCESS,
          payload: responseJson.data
        })
        
      }else{
        dispatch({
            type: FETCHDISCOVERLIST.FAIL,
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
                type: FETCHDISCOVERLIST.FAIL,
              })
        }
      })
  }
}