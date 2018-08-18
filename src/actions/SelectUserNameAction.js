import { SELECT, SELECTEMAIL, SET_USERNAME} from '../utils/types';
import { Actions } from 'react-native-router-flux';
import config from "./../config";
export const selectuserName = (items,check) => {
  return (dispatch) => {
    let obj = {
      "name": items
    }
    let uri = `${config.serverSideUrl}:${config.port}/user/checkUser`
    dispatch({ type: SELECT.SELECTREQUEST, data: obj ,check: check})
    fetch(uri, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify(obj)
    })
      .then((response) => {
        return response.json()
      })
      .then((responseJson) => {
        if (responseJson.status === 201) {
          dispatch({ type: SELECT.SELECTSUCCESS, 
          check: check,
          Data: responseJson 
        })
        }
        if(responseJson.status === 200){
          dispatch({ type: SELECT.SELECTFAILURE,
          check: check,
          Data: responseJson 
        })
        }
      })

      .catch((error) => {
        console.log('error in the api', error)
      });

  }
}
export const selectuserNameInfo = (items,check) => {
  return (dispatch) => {
    let obj = {
      "name": items
    }
    let uri = `${config.serverSideUrl}:${config.port}/user/checkUser`
    dispatch({ type: SELECT.SELECTREQUEST, data: obj ,check: check})
    fetch(uri, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify(obj)
    })
      .then((response) => {
        return response.json()
      })
      .then((responseJson) => {
        if (responseJson.status === 201) {
          dispatch({ type: SELECT.SELECTSUCCESS, 
          check: check,
          Data: responseJson 
        })
        let data = {
          "image": items.image,
          'a_name': items.a_name,
          "username": items.username
        }
        Actions.ChargeSub({ data: data })
        }
        else {
          dispatch({ type: SELECT.SELECTFAILURE,
          check: check,
          Data: responseJson 
        })

        }
      })

      .catch((error) => {
        console.log('error in the api', error)
      });

  }
}
export function setUserName(data) {
  return (dispatch) => {
  dispatch({
      type: SET_USERNAME,
      payload: data,
  });
}
}