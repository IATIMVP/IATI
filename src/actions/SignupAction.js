import { Actions } from "react-native-router-flux";
import { AsyncStorage, Alert } from 'react-native';
import config from '../config';
import {getUserFeeds} from "./DashboardActions/dashboardAction";
import { SIGNUP, ARTIST_LIST, ARTIST_FOLLOW, LOGIN } from '../utils/types';
export const signup = (inputData) => {
  return dispatch => {
    const user = new FormData();
    user.append('file', {
      uri: inputData.file ? inputData.file : inputData.photoUrl320,
      type: 'image/jpg',
      name: `${inputData.name}.jpg`,
    });
    user.append('email', inputData.email);
    user.append('password', inputData.password);
    user.append('name', inputData.name);
    user.append('type', inputData.type);
    user.append('preferred_genre', inputData.preferred_genre);
    user.append('username', inputData.username);
    user.append('gender', inputData.gender);
    user.append('age', inputData.age);
    // user.append('token', inputData.token);
    
    dispatch({ type: SIGNUP.SIGNUP_REQUEST })
    console.log("input to signup api : ", user)
    fetch((`${config.serverSideUrl}:${config.port}/user/usersignup`), {
      method: 'POST',
      body: user
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status === 200) {
          AsyncStorage.setItem('asyncLoginData', JSON.stringify(responseJson))
          dispatch({
            type: SIGNUP.SIGNUP_SUCCESS,
            data: responseJson
          })
          dispatch({
            type: LOGIN.LOGIN_SUCCESS,
            payload: responseJson
          });
          Actions.artistList()
        }
        else {
          dispatch({ type: SIGNUP.SIGNUP_REQUEST_FAIL, data: responseJson })
        }
      })
      .catch(error => {
        if (error) {
          Alert.alert("Some error occurred!")
          dispatch({ type: SIGNUP.SIGNUP_REQUEST_FAIL, data: responseJson })
        }
      })
  }
}

// getArtistList action----------------

export const getArtistList = (inputData) => {
 
  return dispatch => {
    let input ={};
    input.user_id = inputData.userId;

    dispatch({ type: ARTIST_LIST.REQUEST })
    fetch((`${config.serverSideUrl}:${config.port}/artist/artist_list`), {
      method: 'POST',
     
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input),
    })
      .then(response => response.json())
      .then(responseJson => {
       console.log(responseJson)
        if (responseJson.status === 200) {
          
          console.log("response from get artist list api : ",responseJson)
          dispatch({
            type: ARTIST_LIST.SUCCESS,
            data: responseJson.data
          })
    
        }
        else {
          dispatch({ type: ARTIST_LIST.FAIL, data: responseJson })
        }
      })
      .catch(error => {
        if (error) {
         console.error(error)
          dispatch({ type:  ARTIST_LIST.FAIL, data: responseJson })
        }
      })
  }
}

// followArtist

export const followArtist = (inputData) => {
 
  return dispatch => {
   
console.log("input to follow artist api ",inputData)
    dispatch({ type: ARTIST_FOLLOW.REQUEST})
    fetch((`${config.serverSideUrl}:${config.port}/artist/follow_artist`), {
      method: 'POST',
     
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inputData),
    })
      .then(response => response.json())
      .then(responseJson => {
       console.log(responseJson)
        if (responseJson.status === 200) {
          
          console.log("response from follow artist list api : ",responseJson)
          let input = {};
          input.userId = inputData.user_id;
         dispatch(getUserFeeds(input));
          dispatch({
            type: ARTIST_FOLLOW.SUCCESS
          })
         
        }
        else {
          console.log("error response =>", responseJson)
          dispatch({ type: ARTIST_FOLLOW.FAIL, data: responseJson })
        }
      })
      .catch(error => {
        if (error) {
         console.error(error)
          dispatch({ type:  ARTIST_FOLLOW.FAIL, data: responseJson })
        }
      })
  }
}
