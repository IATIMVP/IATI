import { Actions } from "react-native-router-flux";
import { FORGOT_PASSWORD, LOGIN, CHECK_USER, SLOGIN, SWITCH_PROFILE } from '../utils/types';
import { AsyncStorage, Alert } from 'react-native';
import { Images } from './StoreImageAction';
import config from "./../config";
export function login(logindata) {
  let data = {
    email: logindata.email,
    password: logindata.password,
    type: logindata.type
  }
  console.log(`${config.serverSideUrl}:${config.port}/user/userlogin`)
  return (dispatch, getstate) => {
    dispatch({ type: LOGIN.LOGIN_REQUEST });
    fetch(`${config.serverSideUrl}:${config.port}/user/userlogin`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log("login datattatatata===>", responseJson)
        if (responseJson.status === 200) {
          AsyncStorage.setItem('asyncLoginData', JSON.stringify(responseJson))
          dispatch({
            type: LOGIN.LOGIN_SUCCESS,
            payload: responseJson
          });
          dispatch(Images(responseJson.data.picture))
          Actions.dashboard();
        }
        if (responseJson.status === 400) {
          dispatch({ type: LOGIN.LOGIN_REQUEST_FAIL });
        }
      })
      .catch(error => {
        if (error) {
          Alert.alert("Some error occurred!")
          dispatch({ type: LOGIN.LOGIN_REQUEST_FAIL });
        }
      });
  };
}

export function resendmail(data) {
  return (dispatch) => {
    dispatch({ type: FORGOT_PASSWORD.FORGOT_PASSWORD_REQUEST });
    fetch(`${config.serverSideUrl}:${config.port}/user/forgot`, {
      method: "POST",
      headers: {
        'Accept': "application/json",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({ email: data })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status === 200) {

          dispatch({
            type: FORGOT_PASSWORD.FORGOT_PASSWORD_SUCCESS,
            payload: responseJson
          });
        }
        if (responseJson.status === 400) {
          dispatch({ type: FORGOT_PASSWORD.FORGOT_PASSWORD_FAIL });
        }
      })
      .catch(error => {
        if (error) {
          Alert.alert("Some error occurred!")
          dispatch({ type: FORGOT_PASSWORD.FORGOT_PASSWORD_FAIL });
        }
      });
  };
}

export function checkuser(userdata) {
  let data = {
    userId: userdata.userId,
    type: userdata.type,
  }
  return (dispatch, getstate) => {
    dispatch({ type: CHECK_USER.CHECK_USER_REQUEST });
    fetch(`${config.serverSideUrl}:${config.port}/user/checkSocialSignup`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status === 200) {
          dispatch({
            type: CHECK_USER.CHECK_USER_SUCCESS,
            payload: responseJson
          });
          let newData = {
            'file': userdata.file,
            'email': responseJson.email,
            'name': responseJson.name,
            'type': userdata.type,
            'username': responseJson.username,
            'userId': userdata.userId,
            "token": userdata.token
          }
          dispatch(socialLogin(newData))
        }
        if (responseJson.status === 201) {
          dispatch({
            type: CHECK_USER.CHECK_USER_FAIL,
            payload: responseJson
          });
          Actions.SelectUsername({ userChecked: userdata })
        }
      })
      .catch(error => {
        if (error) {
          dispatch({ type: CHECK_USER.CHECK_USER_FAIL });
        }
      });
  };
}

export function socialLogin(checkedData) {
  const user = new FormData();
  user.append('file', checkedData.file)
  user.append('email', checkedData.email);
  user.append('name', checkedData.name);
  user.append('type', checkedData.type);
  user.append('username', checkedData.username);
  user.append('userId', checkedData.userId);
  user.append('token', checkedData.token);
  return (dispatch, getstate) => {
    dispatch({ type: SLOGIN.SLOGIN_REQUEST });
    fetch(`${config.serverSideUrl}:${config.port}/user/socialSignup`, {
      method: 'POST',
      body: user
    })
      .then(response => response.json())
      .then(responseJson => {

        if (responseJson.status === 200) {

          AsyncStorage.setItem('asyncLoginData', JSON.stringify(responseJson))
          dispatch({
            type: SLOGIN.SLOGIN_SUCCESS,
            payload: responseJson
          });

          dispatch({
            type: "LOGIN_SUCCESS",
            payload: responseJson
          });
          dispatch(Images(checkedData.file))
          Actions.artistList();

        }
        else {
          dispatch({ type: SLOGIN.SLOGIN_REQUEST_FAIL });
        }
      })
      .catch(error => {
        if (error) {
          Alert.alert("Some error occurred!")
          dispatch({ type: SLOGIN.SLOGIN_REQUEST_FAIL });
        }
      });
  };
}

export function updateRole(input) {

  return (dispatch, getstate) => {
    dispatch({ type: SWITCH_PROFILE.REQUEST });
    console.log("input to switch role api : ", input)
    fetch(`${config.serverSideUrl}:${config.port}/user/switch_profile`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status === 200) {
          console.log("response from switch artist : ", responseJson)
          dispatch({
            type: SWITCH_PROFILE.SUCCESS,
            payload: responseJson
          });
          if(responseJson.data.role === "user"){
            Alert.alert("You are a Subscriber now.")            
          }
        }
        if (responseJson.status === 201) {
          dispatch({
            type: SWITCH_PROFILE.FAIL,
            payload: responseJson
          });
          // Actions.SelectUsername({ userChecked : userdata })
        }
      })
      .catch(error => {
        if (error) {
          dispatch({ type: SWITCH_PROFILE.FAIL });
        }
      });
  };
}