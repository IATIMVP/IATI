
import { Actions } from "react-native-router-flux";
import { AsyncStorage } from 'react-native';
import { CREATE_PLAYLIST ,COMMONALERT,FETCHPLAYLIST} from '../../utils/types';
import  config from "../../config";

export const playlistaction = (inputData) => {
    console.log("inputData",inputData)

  return dispatch => {
   
   dispatch({ type: CREATE_PLAYLIST.REQUEST })
   let uri =`${config.serverSideUrl}:${config.port}/playlist/create_playlist`
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
        console.log("inputData",inputData)
          console.log("response json",responseJson)
        if (responseJson.status === 200){ 
        dispatch({
          type: CREATE_PLAYLIST.SUCCESS,
          payload: responseJson
        })
        dispatch(fetchPlaylist(inputData.user_id))
        Actions.PlaylistDetails({data: responseJson.data})
        // dispatch({
        //   type:COMMONALERT.SUCCESS, 
        //   errorMsg:"Playlist has been successfully created!",
        //   errorStatus: false,         
        // });
        //Actions.CreatePost()
      }else{
        dispatch({
            type: CREATE_PLAYLIST.FAIL,
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
                type: CREATE_PLAYLIST.FAIL,
              })
        }
      })
  }
}


export const fetchPlaylist = (inputData) => {

  let obj ={
    user_id: inputData,
    keyword:null
  }
  console.log("obj",obj)
return dispatch => {
 
 dispatch({ type: FETCHPLAYLIST.REQUEST })
 let uri =`${config.serverSideUrl}:${config.port}/playlist/get_playlist`
 console.log("uri====>",uri)
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
        console.log("response json",responseJson)
    if (responseJson.status === 200){ 
      dispatch({
        type: FETCHPLAYLIST.SUCCESS,
        payload: responseJson.data
      })
    }else{
      dispatch({
          type: FETCHPLAYLIST.FAIL,
        })
      
    }
    })
    .catch(error => {
      if (error) {
          console.log("response error",error)
          dispatch({
              type: FETCHPLAYLIST.FAIL,
            })
      }
    })
}
}