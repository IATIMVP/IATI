import { USER_FEED, USER_STORY} from '../../utils/types';
const INITIAL_STATE = {
  feedsLoading: false,
  following : [],
  suggested : [],
  storiesLoading : false,
  stories : []
};

function dashboardReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_FEED.REQUEST:
      return {
        ...state,
       feedsLoading : true,
       following : [],
       suggested  :[]
      }

    case USER_FEED.SUCCESS:
      return {
        ...state,
       feedsLoading : false,
       following : action.following,
       suggested : action.suggested
      }
    case USER_FEED.FAIL:
      return Object.assign({}, state, {
        ...state,
        feedsLoading : false,
        following : [],
        suggested :[]
      });

// user story reducers

      case USER_STORY.REQUEST:
      return {
        ...state,
       storiesLoading : true,
      stories : []
      }

    case USER_STORY.SUCCESS:
      return {
        ...state,
        storiesLoading : false,
       stories : action.data
      }
    case USER_STORY.FAIL:
      return Object.assign({}, state, {
        ...state,
        storiesLoading : false,
        stories : []
      });

    default:
      return state;
  }
}

export default dashboardReducer;
