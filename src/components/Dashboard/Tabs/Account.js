import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  StatusBar,
  Alert
} from "react-native";
const WINDOW = Dimensions.get("window");
import { connect } from "react-redux";
import { colorLiteral } from "../../../constants/Color";
import { Actions } from "react-native-router-flux";
import dismissKeyboard from 'react-native-dismiss-keyboard';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Icons from 'react-native-vector-icons/dist/FontAwesome';
import MIcon from 'react-native-vector-icons/dist/MaterialIcons';
import { styles } from "../../../styles/AccountTabStyles";
import OfflineNotice from "./../../common/OfflineNotice";
import { Switch } from 'react-native-switch';
import { login, updateRole } from "../../../actions/LoginAction";
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userImage: "",
      name: '',
      username: '',
      value: true,
      isselected: false,
      userType: "",
      userId : ""

    };
    this.switchhandle = this.switchhandle.bind(this)
  }

  componentDidMount() {
    this.setState({ isselected: this.props.isSelected })
    dismissKeyboard();
    AsyncStorage.getItem('asyncLoginData').then((asyncLoginData) => {
      let logindata = JSON.parse(asyncLoginData)
      if (logindata) {
        if (logindata.type) {
          this.setState({
            logindata: logindata
          })
        }
        else {
          this.setState({
            logindata: logindata,
          })
        }
      }
    }
    )

  }
  logOut() {
    Alert.alert(
      'Logout?',
      'Are you sure you want to log out?',
      [
        { text: 'Yes', onPress: () => this.logout_Action() },
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      ],
      { cancelable: false }
    )


  }
  logout_Action() {
    AsyncStorage.removeItem('asyncLoginData');
    Actions.introscreen({ type: 'reset' })
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProp) {
    if (nextProp.loginReducer.userType === "artist") {
      this.setState({
        userType: "artist"
      })
    }
  }
  switchToSubscriber() {
    Actions.home();
    let input = {};
    input.user_id = this.state.logindata.data._id;
    input.profile_name = 'user';
    this.props.updateRole(input);
  }

  switchToArtist() {
    if(this.props.loginReducer.loginData.data.artist_username.length >0){
      let input = {};
      input.user_id = this.state.logindata.data._id;
      input.profile_name = 'artist';
      this.props.updateRole(input);
    }else{
      let input = {};
      input.user_id = this.state.logindata.data._id;
      input.profile_name = 'artist';
      this.props.updateRole(input);
      Actions.ArtistLogin();
    }
   
  }

  switchhandle() {
    if (this.props.loginReducer.userType === "artist") {
      Alert.alert(
        'Switch ?', 'Are you sure you want to switch to Subscriber ?',
        [
          { text: 'Yes', onPress: () => this.switchToSubscriber() },
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'danger' },
        ],
        { cancelable: false }
      )
    } else {

      Alert.alert(
        'Switch ?', 'Are you sure you want to switch to Artist ?',
        [
          { text: 'Yes', onPress: () => this.switchToArtist() },
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'danger' },
        ],
        { cancelable: false }
      )

    }

  }

  addNewPost = () =>{
   
    Actions.CreatePost()

  }

  render() {
    return (
      <View style={styles.main}>
        <StatusBar
          hidden={false}
          backgroundColor={colorLiteral.STATUSBAR}
          barStyle="dark-content"
        />
        <OfflineNotice />
        <View style={styles.header}>
          <TouchableOpacity style={styles.imageView}>
            <Image source={require('../../../constants/Images/tabImages/search.png')} style={styles.searchImage} />
          </TouchableOpacity>
          <Text style={styles.accountText}>Account</Text>
          <Text style={styles.doneText}></Text>
        </View>
        <View style={styles.body}>
          <View style={styles.viewStyleTop}>
            <Image
              source={{ uri: "http://52.34.207.5" + ":4173" + this.props.loginReducer.loginData.data.picture }}
              style={styles.profilepicStyle}
            />
            <View style={styles.textStyleTop}>
              <Text style={styles.username}>{this.props.loginReducer.loginData.data.name}</Text>
              <Text style={styles.username2}>{this.props.loginReducer.loginData.data.role === "user" ?  this.props.loginReducer.loginData.data.username :  this.props.loginReducer.loginData.data.artist_username}</Text>
            </View>
            <Icon name="ios-arrow-forward-outline" size={30} color={colorLiteral.DARK_GREY} />
          </View>
          <TouchableOpacity style={styles.viewStyle2}>
            <View style={{ paddingLeft: '3%' }}>
              <Icon name="md-share" size={27} color={colorLiteral.DARK_GREY} />
            </View>
            <Text style={styles.textStyle}>Share Profile</Text>
            <Icon name="ios-arrow-forward-outline" size={30} color={colorLiteral.DARK_GREY} />
          </TouchableOpacity>
          {
            this.state.isselected ? null :
              <TouchableOpacity style={styles.viewStyle2}
                onPress={() =>
                  this.switchhandle()
                }
              >
                <View style={{ paddingLeft: '3%' }}>
                  <Icons name="refresh" size={25} color={colorLiteral.DARK_GREY} />
                </View>
                {this.props.loginReducer.userType === "artist" ? <Text style={styles.textStyle}>Switch to Subscriber</Text> : <Text style={styles.textStyle}>Switch to Artist</Text>}
                <Icon name="ios-arrow-forward-outline" size={30} color={colorLiteral} />
              </TouchableOpacity>}
          <View style={{ flex: 0.04, backgroundColor: colorLiteral.VERYLIGHT_GREY }}></View>
          <ScrollView
            contentContainerStyle={styles.pageView}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
          >

            {
              this.props.loginReducer.userType === "artist" ?
                <TouchableOpacity style={styles.viewStyle} onPress={() => {this.addNewPost() }}>
                  <View style={{ paddingLeft: '2%' }}>
                    <MIcon name="add-to-photos" size={27} color={colorLiteral.GREY} />
                  </View>
                  <Text style={styles.textNew}>Add new Post</Text>
                </TouchableOpacity> : null
            }

            <TouchableOpacity style={styles.viewStyle}>
              <View style={{ paddingLeft: '2%' }}>
                <MIcon name="account-box" size={27} color={colorLiteral.BLUE} />
              </View>
              <Text style={styles.textNew}>Find Friends via contacts(19)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewStyle}>
              <View style={{ paddingLeft: '3%' }}>
                <Icon name="logo-facebook" size={27} color={colorLiteral.PURPLE} />
              </View>
              <Text style={styles.textNew}>Find Friends via Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewStyle}>
              <View style={{ paddingLeft: '2%' }}>
                <MIcon name="add-box" size={27} color={colorLiteral.BLUE} />
              </View>
              <Text style={styles.textNew}>Invite Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewStyle}>
              <View style={{ paddingLeft: '3%' }}>
                <Icon name="ios-notifications" size={27} color={colorLiteral.DARK_GREY} />
              </View>
              <Text style={styles.textNew}>Notification Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewStyle}>
              <View style={{ paddingLeft: '3%' }}>
                <Icon name="ios-card" size={27} color={colorLiteral.DARK_GREY} />
              </View>
              <Text style={styles.textNew}>Payment Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewStyle}>
              <View style={{ paddingLeft: '3%' }}>
                <MIcon name="stars" size={25} color={colorLiteral.DARK_GREY} />
              </View>
              <Text style={styles.textNew}>Favorites</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewStyle}>
              <View style={{ paddingLeft: '3%' }}>
                <Icon name="ios-cloud-download-outline" size={25} color={colorLiteral.DARK_GREY} />
              </View>
              <Text style={styles.textNew}>Downloads</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Actions.CreatePlaylist()}
              style={styles.viewStyle}>
              <View style={{ paddingLeft: '3%' }}>
                <MIcon name="playlist-add" size={27} color={colorLiteral.DARK_GREY} />
              </View>
              <Text style={styles.textNew}>Playlists</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewStyle}>
              <View style={{ paddingLeft: '3%' }}>
                <Icon name="ios-settings" size={28} color={colorLiteral.DARK_GREY} />
              </View>
              <Text style={styles.textNew}>Account Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.viewStyle1}>
              <View style={{ paddingLeft: '3%' }}>
                <Icon name="md-lock" size={30} color={colorLiteral.DARK_GREY} />
              </View>
              <View style={{ flex: 0.7 }}>
                <Text style={{ fontSize: WINDOW.width * 0.04, marginTop: '0%' }}>Private Account</Text>
                <Text style={{ fontSize: WINDOW.width * 0.027, color: 'grey' }}>When your account is set to private, users</Text>
                <Text style={{ fontSize: WINDOW.width * 0.027, color: 'grey' }}>will need to follow you to access your profile.</Text>
              </View>
              <View style={{ flex: 0.2, marginTop: '2%' }}>
                <Switch
                  value={this.state.value}
                  onValueChange={(value) => this.setState({ value: !this.state.value })}
                  disabled={false}
                  activeText={'On'}
                  inActiveText={'Off'}
                  circleSize={30}
                  circleBorderWidth={1}
                  backgroundActive={'#a6eda6'}
                  backgroundInactive={'#d2d2d2'}
                  circleActiveColor={'white'}
                  circleInActiveColor={'white'}
                  changeValueImmediately={true}
                  changeValueImmediately={true}
                  innerCircleStyle={{ alignItems: "center", justifyContent: "center", borderColor: this.state.value === true ? "#88ef8a" : "#a2a2a2" }}
                  outerCircleStyle={{}}
                  renderActiveText={false}
                  renderInActiveText={false}
                  switchLeftPx={3}
                  switchRightPx={3}
                  switchWidthMultiplier={1.8}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 0.1, paddingVertical:15 }} onPress={() => this.logOut()}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}

function mapUser(state) {
  return {
    loginReducer: state.loginReducer,
    signupReducer: state.signupReducer,
    checkuserReducer: state.checkuserReducer
  };
}

export default connect(mapUser, { updateRole })(Account);
