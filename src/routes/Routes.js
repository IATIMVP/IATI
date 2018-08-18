import React, { Element } from "react";
import { connect } from "react-redux";
import { Scene, Router, Modal, Reducer, Actions } from "react-native-router-flux";
import { StatusBar, Image, TouchableOpacity, Dimensions, Text, Platform } from "react-native";
import TabbarView from "./TabbarView";
import LoginContainer from "../containers/LoginContainer";
import SignupContainer from "../containers/SignupContainer";
import SignupInfo from "./../components/SignupInfo";
import Signup from "./../components/Signup";
import Dashboard from "./../components/Dashboard/Dashboard";
import { colorLiteral } from "../constants/Color";
import SelectGenre from "../components/SelectGenre";
import IntroScreen from "../components/IntroScreen";
import Home from "./../components/Dashboard/Tabs/Home";
import AddSubscription from "./../components/Dashboard/Tabs/AddSubscription";
import Account from "./../components/Dashboard/Tabs/Account";
import Notifications from "./../components/Dashboard/Tabs/Notifications";
import Search from "./../components/Dashboard/Tabs/Search";
import ArtistList from "./../components/SignUp/ArtistList";
import MusicPlayer from "../components/MusicPlayer";
import SelectUsername from "../components/SignUp/Selectusername";
import CreatePlaylist from "../components/Playlist/createPlaylist";
import PlaylistDetails from "../components/Playlist/playlistDetails";
import DiscoverArtist from "./../components/Dashboard/Tabs/DiscoverArtist"

import DetailView from "./../components/Dashboard/Tabs/DetailView"
import multiDetailView from "./../components/Dashboard/Tabs/multiDetailView"


import PROFILE_EDIT_ICON from 'react-native-vector-icons/MaterialIcons'; 3
import MORE_ICON from 'react-native-vector-icons/Feather';
import IOS_BACK from 'react-native-vector-icons/Ionicons';



import SearchPage from "./../components/Search_Group"



const WINDOW = Dimensions.get("window");
const DRAWER_ICON_SIZE = WINDOW.height / 26;
const DRAWER_WIDTH = WINDOW.width / 1.5;
export default class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: ""
    };
  }
  componentDidMount() {
    //   if (this.props.signupReducer.signupData !=="") {
    //     alert()
    //     this.setState({
    //       logindata: this.props.signupReducer.signupData,
    //       name: this.props.signupReducer.signupData.data.name,
    //       userImage: this.props.signupReducer.signupData.data.picture,
    //       username: this.props.signupReducer.signupData.data.username
    //     })
    //   }
    //  else if (this.props.loginReducer.loginData) {
    //     this.setState({
    //       logindata: this.props.loginReducer,
    //       name: this.props.loginReducer.loginData.data.name,
    //       userImage: this.props.loginReducer.loginData.data.picture,
    //       username: this.props.loginReducer.loginData.data.username
    //     })
    //   }

  }

  //   componentWillReceiveProps(nextProps){
  //     alert()
  // if(nextProps.StoreImageReducer){
  //   this.setState({image:nextProps.StoreImageReducer.Storeimage})
  //   console.log("nextProps.StoreImageReducer.Storeimage",nextProps.StoreImageReducer.Storeimage)

  // }
  //   }
  render(): Element<*> {
    return (
      <Router>
        <Scene key="root"  >

          <Scene
            key="introscreen"
            component={IntroScreen}
            hideNavBar
            panHandlers={null}
          />
          <Scene
            hideNavBar
            panHandlers={null}
            key="login"
            component={LoginContainer}
            title="Log in"
            backTitle="Back"
            backButtonTextStyle={{ color: colorLiteral.GREY }}
          />
          <Scene
            hideNavBar
            panHandlers={null}
            key="signup"
            backTitle="Back"
            backButtonTextStyle={{ color: colorLiteral.GREY }}
            title="Sign Up"
            component={SignupContainer}
          />
          <Scene
            panHandlers={null}
            key="selectgenre"
            hideNavBar
            component={SelectGenre}
          />
          <Scene
            panHandlers={null}
            key="SignupInfo"
            backTitle="Back"
            backButtonTextStyle={{ color: colorLiteral.GREY }}
            component={SignupInfo}
            title="Sign Up"
          />
          <Scene
            panHandlers={null}
            key="SelectUsername"
            component={SelectUsername}
            hideNavBar
          />
          <Scene
          
            hideNavBar={false}
            panHandlers={null}
            key="CreatePlaylist"
            component={CreatePlaylist}
            title="Playlist"
            titleStyle={{color:"black",fontWeight:"bold"}}
            renderLeftButton={() => {
              return (<TouchableOpacity
              onPress={()=>Actions.pop()}
                style={{ flex: 1, width: WINDOW.width * 0.1, alignItems: 'center', justifyContent: 'center' }}>
                <IOS_BACK name="ios-arrow-back" size={30} color="grey" />
              </TouchableOpacity>);
            }}
            renderRightButton={() => {
              return (<TouchableOpacity

                style={{ flex: 1, width: WINDOW.width * 0.1, alignItems: 'center', justifyContent: 'center' }}>

              </TouchableOpacity>);
            }}
          />
          <Scene
          
           hideNavBar={false}
            panHandlers={null}
            key="PlaylistDetails"
            component={PlaylistDetails}
            titleStyle={{color:"black",fontWeight:"bold"}}
            title="Playlist"
          
          
            renderLeftButton={() => {
              return (<TouchableOpacity
              onPress={()=>Actions.pop()}
                style={{ flex: 1, width: WINDOW.width * 0.1, alignItems: 'center', justifyContent: 'center' }}>
                <IOS_BACK name="ios-arrow-back" size={30} color="grey" />
              </TouchableOpacity>);
            }}
            renderRightButton={() => {
              return (<TouchableOpacity

                style={{ flex: 1, width: WINDOW.width * 0.1, alignItems: 'center', justifyContent: 'center' }}>
                <MORE_ICON name="more-horizontal" size={30} color="grey" />
              </TouchableOpacity>);
            }}
           
          />

          <Scene

            hideNavBar
            panHandlers={null}
            key="SearchPage"
            component={SearchPage}
            backButtonTextStyle={{ color: colorLiteral.GREY }}
          />
          <Scene

            hideNavBar
            panHandlers={null}
            key="DetailView"
            component={DetailView}
            backButtonTextStyle={{ color: colorLiteral.GREY }}
          />
          <Scene
            hideNavBar={false}
            panHandlers={null}
            key="multiDetailView"
            component={multiDetailView}
            tintColor={"black"}
            title="Tracks"
            titleStyle={{color:"black",fontWeight:"bold"}}
            // onBack={()=>Actions.pop()}
            backButtonTextStyle={{ color: colorLiteral.GREY }}

          />
          <Scene
            panHandlers={null}
            key="artistList"
            component={ArtistList}
            hideNavBar
          />
          <Scene
            panHandlers={null}
            key="musicPlayer"
            hideNavBar
            component={Platform.OS==="ios"? MusicPlayer:Notifications }
          />
            <Scene key="DiscoverArtist" 
          clone
          component={DiscoverArtist}
             hideNavBar={true}
            hideTabBar={false} 
            navigationBarStyle={{ backgroundColor: '#ffffff' }}
        />
          {TabbarView}
        </Scene>
      </Router>
    );
  }
}