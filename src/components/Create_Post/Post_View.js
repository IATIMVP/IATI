import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Image,
  Alert,
  Platform,
  Modal,
  StatusBar
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/EvilIcons';
import { colorLiteral } from "../../constants/Color";
import { styles } from "../../styles/CreatePostStyle";
import NavigationBar from '../common/NavBar';
import OfflineNotice from "./../common/OfflineNotice"
const WINDOW = Dimensions.get("window");
class Post_View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      avatarSource: "https://www.1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png",
    };
  }
  componentWillMount() {
  }
  componentWillReceiveProps(nextProp) {

    if (nextProp.CreatePost && nextProp.CreatePost.isLoading === true) {
      this.setState({ loading: true })
    }
    if (nextProp.CreatePost && nextProp.CreatePost.publish_post.message === "success") {
      this.setState({ loading: false, data: nextProp.CreatePost.publish_post })
    }

  }

  render() {
    return (
      <KeyboardAwareScrollView scrollEnabled={false}
        keyboardShouldPersistTaps={Platform.OS === 'ios' ? 'never' : 'always'}
        contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <StatusBar
            hidden={false}
            backgroundColor={colorLiteral.STATUSBAR}
            barStyle="dark-content"
          />
          <OfflineNotice />
          <NavigationBar
            title="Say No More"
            back
            onLeftButtonPress={() => Actions.pop()}
          />
          <View style={styles.postView}>
            <View style={{ flex: 0.08, backgroundColor: 'white', alignItems: 'center', flexDirection: 'row' }}>
              <Image
                style={styles.logo}
                source={{ uri: this.state.avatarSource }}
              />
              <View style={{ backgroundColor: 'white', flex: 0.95, marginLeft: '3%' }}>
                <Text style={{ fontSize: 14 }}>Shinobi Ninja</Text>
                <Text style={{ fontSize: 11, color: 'grey' }}>May 1,2017</Text>
              </View>
              <TouchableOpacity><Image source={require('../../constants/Images/star.png')} style={{ width: 25, height: 25 }} /></TouchableOpacity>

            </View>
            <View style={{ flex: 0.29 }}></View>
            <View style={{ flex: 0.23, justifyContent: 'center', paddingHorizontal: '3%' }}>
              <Text style={{ fontSize: 16 }}>Say No More</Text>
              <Text style={{ fontSize: 12, color: 'grey', marginTop: '1%' }}>This is the latest track from our sophmore album "Lee's</Text>
              <Text style={{ fontSize: 12, color: 'grey', marginBottom: '1%' }}>Vine". Check it out. Let us know.</Text>
              <Text style={{ fontSize: 14, color: colorLiteral.DARK_GREY }}>Alternative</Text>
              <View style={{ flex: 0.7, marginTop: '3%', flexDirection: 'row', borderTopWidth: 1, borderBottomWidth: 1, borderBottomColor: '#c9c9c9', borderTopColor: '#c9c9c9', alignItems: 'center' }}>

                <Text style={{ color: 'grey', fontSize: 13 }}>210 subscribers  -   $12,500 per single  -  210,433 plays</Text>
              </View>
            </View>
            <View style={{ flex: 0.07, flexDirection: 'row', paddingHorizontal: '3%' }}>
              <View style={{ flex: 0.22, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#c9c9c9' }}>

                <TouchableOpacity><Icon name="heart" color={colorLiteral.DARK_GREY} size={38} /></TouchableOpacity>
                <Text style={{ fontSize: 15, color: colorLiteral.DARK_GREY }}>12.5K</Text>
              </View>
              <View style={{ flex: 0.22, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: '#c9c9c9' }}>
                <TouchableOpacity><Image source={require('../../constants/Images/signup/comment.png')} style={{ width: 28, height: 22, tintColor: colorLiteral.DARK_GREY }} /></TouchableOpacity>
                <Text style={{ fontSize: 15, marginLeft: '6%', color: colorLiteral.DARK_GREY }}>628</Text>
              </View>
              <View style={{ flex: 0.57, justifyContent: 'center', alignItems: 'flex-end', borderBottomWidth: 1, borderBottomColor: '#c9c9c9' }}>
                <TouchableOpacity><Text style={{ fontSize: 15, color: colorLiteral.DARK_GREY }}>View all 628 comments</Text></TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 0.1, flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={{ fontSize: 20 }}>Includes</Text>

            </View>
            <View style={{ flex: 0.2 }}></View>
          </View>
        </View>
      </KeyboardAwareScrollView >
    );
  }
}


function mapUser(state) {
  return {

    CreatePost: state.CreatePost,
  };
}

export default connect(mapUser)(Post_View);