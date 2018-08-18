
import config from '../../config';
import { USER_FEED, USER_STORY } from '../../utils/types';

// getUserFeeds action----------------

export const getUserFeeds = (inputData) => {

  return dispatch => {
    let input = {};
    input.user_id = inputData.userId;

    dispatch({ type: USER_FEED.REQUEST })
    fetch((`${config.serverSideUrl}:${config.port}/user/user_feed`), {
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
          console.log("response from get user feed api : ", responseJson)
          dispatch({
            type: USER_FEED.SUCCESS,
            following: responseJson.data[0].feeds,
            suggested:responseJson.data[1].suggestions
          })
        }
        else {
          dispatch({ type: USER_FEED.FAIL, data: responseJson })
        }
      })
      .catch(error => {
        if (error) {
          console.error(error)
          dispatch({ type: USER_FEED.FAIL, data: responseJson })
        }
      })
  }
}

export const getUserStories = (inputData) => {
  return dispatch => {
    let input = {};
    input.user_id = inputData.userId;
    dispatch({ type: USER_STORY.REQUEST })
    fetch((`${config.serverSideUrl}:${config.port}/user/user_stories`), {
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
          console.log("response from get user stories api : ", responseJson)
          dispatch({
            type: USER_STORY.SUCCESS,
            data: responseJson.data
          })
        }
        else {
          dispatch({ type: USER_STORY.FAIL, data: responseJson })
        }
      })
      .catch(error => {
        if (error) {
          console.error(error)
          dispatch({ type: USER_STORY.FAIL, data: responseJson })
        }
      })
  }
}

