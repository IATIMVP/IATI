import { SIGNUP, ARTIST_LIST, ARTIST_FOLLOW } from '../../utils/types';
const INITIAL_STATE = {
  loading: false,
  signupData: '',
  error: '',
  artistList : [],
  followLoading : false,
  followed : false
};

function signupReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGNUP.SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        signupData: ''
      }
    case SIGNUP.SIGNUP_SUCCESS:
    console.log("signup data in reducer : ", action.data)
      return {
        ...state,
        signupData: JSON.parse(JSON.stringify(action.data)),
        loading: false
      }
    case SIGNUP.SIGNUP_REQUEST_FAIL:
      return Object.assign({}, state, {
        state,
        error: "Email already exist",
        loading: false
      });


      case ARTIST_LIST.REQUEST:
      return {
        ...state,
        loading: true,
        artistList:[]
      }

      case ARTIST_LIST.SUCCESS:
      return {
        ...state,
        loading: false,
        artistList:action.data
      }

      case ARTIST_LIST.FAIL:
      return {
        ...state,
        loading: false,
        artistList:[]
      }

      case ARTIST_FOLLOW.REQUEST:
      return {
        ...state,
        followLoading: true,
        followed : false
      }
      case ARTIST_FOLLOW.SUCCESS:
      return {
        ...state,
        followLoading: false,
        followed : true
      }
      case ARTIST_FOLLOW.FAIL:
      return {
        ...state,
        followLoading: false,
        followed : false
      }

    default:
      return state;
  }
}

export default signupReducer;
