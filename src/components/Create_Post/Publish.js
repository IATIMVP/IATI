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
import Icon from 'react-native-vector-icons/Ionicons';
import { publishPost } from "../../actions/CreatePostAction/PublishPostAction";
import { editPost } from "../../actions/EditPostAction/EditPostAction";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colorLiteral } from "../../constants/Color";
import { styles } from "../../styles/CreatePostStyle";
import NavigationBar from '../common/NavBar';
import RoundCheckbox from 'rn-round-checkbox';
import OfflineNotice from "./../common/OfflineNotice"
const WINDOW = Dimensions.get("window");
class Publish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Public",
      isSel: false,
      isSelected: false,
      loading: false,
      edit: false
    };
  }
  componentWillReceiveProps(nextProp) {
    if (nextProp.setGenres && nextProp.setGenres.privacy) {
      this.setState({ value: nextProp.setGenres.privacy })
    }
    if (nextProp.CreatePost && nextProp.CreatePost.isLoading === true) {
      this.setState({ loading: true })
    }
    if (nextProp.CreatePost && nextProp.CreatePost.publish_post.message === "success") {
      this.setState({})
      Alert.alert("Posted Successfully")
    }
    // if (nextProp.UpdatePost && nextProp.UpdatePost.edit_post.message === "success") {
    //   alert()
    // }
  }

  handlePublish = () => {
    let data = {
      "genre": this.props.data.genre,
      "genre_type": this.props.data.genre_type,
      "title": this.props.data.title,
      "description": this.props.data.description,
      "file": this.props.data.file,
      "privacy": this.state.value,
      "charge": this.state.isSelected ? true : false,
      "token" : this.props.loginReducer.loginData.data.token,
      "userId" : this.props.loginReducer.loginData.data._id
    }
    if (this.state.edit === true) {
      this.props.editPost(data)
    }
    else {
      this.props.publishPost(data)
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
            title="Publish"
            back
            onLeftButtonPress={() => Actions.pop()}
          />
          <View style={styles.publishView}>
            <View style={styles.topTextView}>
              <Text style={styles.topText}>Who can access this post?</Text>
            </View>
            <TouchableOpacity style={styles.setPrivacyBar} onPress={() => Actions.Post_Privacy()}>
              <Text style={styles.setPrivacyText}>{this.state.value !== " " ? this.state.value : "Privacy"}</Text>
              <Icon name="ios-arrow-forward-outline" size={27} color="grey" />
            </TouchableOpacity>
            <View style={styles.questionTextView}>
              <Text style={styles.questionText}>Do you want to charge your subscribers for this post?</Text>
            </View>
            <View style={styles.renderTickView}>
              <View style={styles.firstTickView}>
                <View style={styles.checkboxView}>
                  <RoundCheckbox
                    icon="md-checkmark"
                    size={30}
                    iconColor={colorLiteral.BUTTON}
                    borderColor={this.props.checked ? colorLiteral.BUTTON : colorLiteral.BUTTON}
                    backgroundColor='white'
                    checked={this.state.isSelected}
                    onValueChange={(newValue) => { this.setState({ isSelected: !this.state.isSelected, isSel: false }) }}
                  />
                </View>
                <View style={styles.YesTextView}>
                  <Text style={styles.YesText}>Yes</Text>
                  <View style={styles.subTotalView}>
                    <Text style={styles.subTotaltext}>20 Subscribers totalling</Text>
                    <Text style={styles.dollarText}>$650</Text>
                    <Text></Text>
                  </View>
                </View>
              </View>
              <View style={styles.firstTickView}>
                <View style={styles.checkboxView}>
                  <RoundCheckbox
                    icon="md-checkmark"
                    size={30}
                    iconColor={colorLiteral.BUTTON}
                    borderColor={colorLiteral.BUTTON}
                    backgroundColor={colorLiteral.WHITE}
                    checked={this.state.isSel}
                    onValueChange={(newValue) => { this.setState({ isSel: !this.state.isSel, isSelected: false }) }}
                  />
                </View>
                <View style={styles.YesTextView}>
                  <Text style={styles.YesText}>No</Text>
                  <Text style={styles.subTotaltext}>This is a free post</Text>
                </View>
              </View>
            </View>
            <View style={styles.importantView}>
              <View style={styles.subTotalView}>
                <Text style={styles.impText}>IMPORTANT</Text><Text style={styles.otherText}> By sharing, you confirm that your project and sounds</Text>
              </View>
              <Text style={styles.otherText}>comply with our Terms of Use and don't infringe anyone's rights.</Text>
            </View>
          </View>
          <View style={styles.publishButtonView}>
            <TouchableOpacity style={styles.loginButton}
              onPress={() => { this.handlePublish() }}>
              {this.state.loading === true ?
                <ActivityIndicator />
                :
                <Text style={styles.loginText}>Publish</Text>
              }
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView >
    );
  }
}


function mapUser(state) {
  return {
    setGenres: state.setGenres,
    CreatePost: state.CreatePost,
    UpdatePost: state.UpdatePost,
    loginReducer : state.loginReducer
  };
}

export default connect(mapUser, { publishPost, editPost })(Publish);