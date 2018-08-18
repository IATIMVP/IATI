import { combineReducers } from "redux";
import loginReducer from "./auth/LoginReducer";
import forgotpasswordReducer from "./auth/Forgot_PasswordReducer"
import signupReducer from "./auth/SignupReducer";
import user from "./user";
import appConfig from "./appConfig";
import appState from "./appState";
import GenreListReducers from "./GenreListReducers";
import getGenres from "./CreatePostReducer/GetGenreListReducer";
import setGenres from "./CreatePostReducer/SetGenreReducer";
import setTypes from "./CreatePostReducer/SetTypeReducer";
import genreTypeList from "./CreatePostReducer/GetGenreTypeReducer";
import CreatePost from "./CreatePostReducer/PublishPostReducer"
import getSubList from "./CreatePostReducer/GetSubLevelReducer";
import setSubLevel from "./ArtistLoginReducer/SetLevelReducer";
import editAccountReducer from "./EditAccountReducer";
import setSubscription from './SubscriptionReducer/setSubscriptionReducer';
import UpdatePost from './EditPostReducer';
import checkuserReducer from './auth/Check_userReducer';
import SelectUserNameReducer from "./SelectUserNameReducer";
import SelectEmailReducer from "./SelectEmailReducer";
import StoreImageReducer from "./StoreImageReducer";
import setInfo from "../reducers/SetUserInfo"
import createPlaylistReducer from "./PlaylistGroup/createPlaylistReducer"
import fetchPlaylistData from "./PlaylistGroup/fetchPlaylistData"
import fetchDiscoverlist from "./DiscoverReducer/fetchDiscoverlist"
import getSuggestionsList from "./SearchGroup/getSuggestionsList"
import getDataList from "./SearchGroup/getDataList"
import dashboardReducer from "./DashboardReducer/dashboardReducer";

import CommonAlertReducer from "./CommonAlert/CommonAlertReducer";

const appReducer = combineReducers({
  loginReducer,
  createPlaylistReducer,
  signupReducer,
  user,
  appConfig,
  appState,
  GenreListReducers,
  forgotpasswordReducer,
  getGenres,
  setGenres,
  genreTypeList,
  CreatePost,
  setTypes,
  getSubList,
  setSubLevel,
  editAccountReducer,
  setSubscription,
  UpdatePost,
  checkuserReducer,
  SelectUserNameReducer,
  SelectEmailReducer,
  StoreImageReducer,
  setInfo,
  CommonAlertReducer,
  fetchPlaylistData,
  fetchDiscoverlist,
  getSuggestionsList,
  getDataList,
  dashboardReducer
});

export default appReducer;
