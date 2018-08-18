import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  Dimensions,
  Image,
  Alert,
  NetInfo,
  FlatList,
  Platform,
  StatusBar,
  ScrollView,
  AsyncStorage,
} from "react-native";
import dismissKeyboard from 'react-native-dismiss-keyboard';
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { login } from "../actions/LoginAction";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colorLiteral } from "../constants/Color";
import { styles } from "../styles/Introstyles";
import OfflineNotice from "./common/OfflineNotice";

const WINDOW = Dimensions.get("window");
class IntroScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      loggedin: false,
      internet: false,
      internetChecking: true,
      data: [
        {
          image: require('../constants/Images/signup/image_01.png'),
          name: "Say No More",
          title: "Fickle friends",
          genre: "Indie Rock",
          liked: false
        },
        {
          image: require('../constants/Images/signup/image_02.png'),
          name: "Run Up",
          title: "Major Lazor",
          genre: "Alternative",
          liked: false
        },
        {
          image: require('../constants/Images/signup/image_03.png'),
          name: "TRXYE",
          title: "Trxye",
          genre: "Classical",
          liked: false
        },
        {
          image: require('../constants/Images/signup/image_04.png'),
          name: "Too Original",
          title: "Elliphant Jovi",
          genre: "Country",
          liked: false
        },
        {
          image: require('../constants/Images/signup/image_01.png'),
          name: "Say No More",
          genre: "Alternative",
          liked: false
        },
        {
          image: require('../constants/Images/signup/image_02.png'),
          name: "Run Up",
          title: "Major Lazor",
          genre: "Classical",
          liked: false
        },
        {
          image: require('../constants/Images/signup/image_01.png'),
          name: "Say No More",
          title: "Fickle friends",
          genre: "Alternative",
          liked: false
        },

      ]
    };
  }
 
  componentDidMount() {
    dismissKeyboard();
    AsyncStorage.getItem('asyncLoginData').then((asyncLoginData) => {
      let val = JSON.parse(asyncLoginData)
      if (val === null) {
        this.setState({ loggedin: false })
      }
      else {
        this.setState({ loggedin: true })
      }
    })
  }
  like(index) {
    let arr = this.state.data;
    arr[index].liked = !arr[index].liked;
    this.setState({
      data: arr
    });
  }

  onSelect() {
    AsyncStorage.getItem('asyncLoginData').then((asyncLoginData) => {
      let val = JSON.parse(asyncLoginData)
      if (val === null) {
        this.setState({ loggedin: false })
        Actions.login()
      }
      else {
        this.setState({ loggedin: true })
        Actions.dashboard()
      }
    })
  }
  render() {

    return (
      <View style={styles.main}>
        <StatusBar
          hidden={false}
          backgroundColor={"rgb(181, 183, 188)"}
          barStyle="light-content"
        />
        <OfflineNotice/>
        <View style={styles.maincontainer}>
          <Image source={require('../constants/Images/signup/header.png')} style={styles.header} />
    <View style={styles.container} >
            <Text style={styles.headerText}>Independence</Text>
            <Text style={styles.headerText}>in a major way.</Text>
            {/* {this.state.internet === true ?  */}
            <TouchableHighlight
              underlayColor={"transparent"}
              onPress={() => this.onSelect()}
              style={styles.loginButton}>
              <Text style={styles.loginButtonText}>{this.state.loggedin === true ? "DASHBOARD" : "LOGIN"}</Text>
            </TouchableHighlight> 
            {/* // : null} */}
            {/* {this.state.internet === false ? <Text style={{ color: colorLiteral.RED, marginTop: 25 }}>Please check your Internet connctivity.</Text> : null} */}
          </View>
        </View>
        <View style={styles.scrollcontainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainer={styles.postView}>
            <View style={styles.textView}>
              <Text style={[styles.trendingList, { color: colorLiteral.BUTTON, }]}>Trending</Text><Text style={[{ color: colorLiteral.GREY }, styles.trendingList1]}>Now</Text>
            </View>
            <View style={styles.flatlistView}>
              <FlatList
                data={this.state.data}
                extraData={this.state}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) =>
                  <View style={styles.flatListRender}>

                    <TouchableOpacity
                      underlayColor={"transparent"}
                      onPress={() => this.onSelect()}
                      style={styles.onselectGenre}>
                      <Image
                        source={item.image} style={styles.postImage}
                      />
                      <View style={styles.imageView}>
                        <Text style={styles.textStyle}>{item.name}</Text>
                        <Text style={styles.textStyle1}>{item.title}</Text>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.nextView}>
                      <Text style={styles.genre}>{item.genre}</Text>
                      <View style={styles.iconView}>
                        <TouchableOpacity onPress={() => this.like(index)} style={styles.heartContainer}>
                          {item.liked ? <Image source={require('../constants/Images/signup/heart.png')} style={styles.imageIcon} /> : <Image source={require('../constants/Images/signup/heartOutline.png')} style={styles.unlikedImage} />}
                        </TouchableOpacity>
                        <Text style={styles.numberStyling}>257</Text>
                        <TouchableOpacity style={styles.imageIconContainer} onPress={() => { alert("under developement") }}>
                          <Image source={require('../constants/Images/signup/comment.png')} style={styles.imageIcon1} />
                        </TouchableOpacity>
                        <Text style={[styles.numberStyling, { paddingLeft: '2%' }]}>26</Text>
                        <TouchableOpacity style={styles.imageIconContainer} onPress={() => { alert("under developement") }}>
                          <Image source={require('../constants/Images/signup/Subscribe.png')} style={styles.imageIcon3} />
                        </TouchableOpacity>
                        <Text style={[styles.numberStyling, { paddingLeft: '2%' }]}>12</Text>
                      </View>
                    </View>
                  </View>
                }
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

function mapUser(state) {
  return { loginReducer: state.loginReducer };
}

export default connect(mapUser, { login })(IntroScreen);
