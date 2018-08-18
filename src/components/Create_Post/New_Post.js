import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Dimensions,
  Image,
  Alert,
  Platform,
  Modal,
  StatusBar,
  BackHandler
} from "react-native";
import ActionSheet from 'react-native-actionsheet';
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Entypo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colorLiteral } from "../../constants/Color";
import { styles } from "../../styles/CreatePostStyle";
import NavigationBar from '../common/NavBar';
import ImagePicker from 'react-native-image-crop-picker';
import YouTube from 'react-native-youtube';
import SelectGenre from './Select_Genre';
import OfflineNotice from "./../common/OfflineNotice"
const WINDOW = Dimensions.get("window");
import Permissions from 'react-native-permissions';
class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postTitle: '',
      image: false,
      avatarSource: "",
      openModal: false,
      videoId: "",
      link: '',
      url: "",
      getvideo: false,
      Caption: '',
      file: '',
      genre: '',
      types: '',
      StatusBar,
    };
  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProp) {
    if (nextProp.setGenres && nextProp.setGenres.data) {
      this.setState({ genre: nextProp.setGenres.data })
    }
    if (nextProp.setTypes && nextProp.setTypes.types) {
      this.setState({ types: nextProp.setTypes.types })
    }
  }

  onChangeTitle(postTitle) {
    this.setState({ postTitle: postTitle })
  }
  onChangeCaption(Caption) {
    this.setState({ Caption: Caption })
  }

  handleSubmit() {

    let data = {
      "genre": this.state.genre,
      "genre_type": this.state.types,
      "title": this.state.postTitle,
      "description": this.state.Caption,
      "file": this.state.avatarSource ? this.state.avatarSource : this.state.link ? this.state.link : null
    }
    if (this.state.genre !== "" && this.state.types !== "" && data.file !== "") {
      Actions.Publish({ data: data })
    }
    else if (data.file === "") {
      Alert.alert("Please Choose a Post")
    }
    else if (this.state.genre === "" || this.state.types === "") {
      Alert.alert("Please Fill all the values")
    }
  }
  // }
  onDone = () => {
    if (this.state.link === '') {
      Alert.alert("Please fill the link")
    }
    else if (!(this.state.link.match(/v\/|v=|youtu\.be\//))) {
      Alert.alert("Not a valid link")
    }
    else {
      let url = this.state.link
      let success = false;
      let media = {};
      if (url) {
        youtube_id = url.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0];
      }

      media.type = "youtube";
      media.id = youtube_id;
      success = true;
      this.setState({ openModal: false, url: media.id, getvideo: true })
    }
  }
  showActionsheet() {
    this.ActionSheet.show()
  }
  handleactionsheet(index) {
    Permissions.request('camera').then(response => {
      this.setState({ cameraPermission: response })
    })

    if (index == 0) {
      if (this.state.cameraPermission === "authorized") {
        ImagePicker.openCamera({
          cropping: true,
          width: 500,
          height: 500,
          includeExif: true,

        }).then(image => {
          this.setState({
            image: { uri: image.path, width: image.width, height: image.height },
            images: null,
            avatarSource: image.path,
            buttonAbled: true,
            image: true
          });
        }).catch(e => console(e));
      }
      else {
        Alert.alert(
          'Can we access your camera?',
          'We need access so you can set your profile pic',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Permission denied'),
              style: 'cancel',
            },
            this.state.photoPermission == 'undetermined'
              ? { text: 'OK', onPress: this._requestPermission }
              : { text: 'Open Settings', onPress: Permissions.openSettings },
          ],
        )
        Permissions.request('camera').then(response => {
          this.setState({ cameraPermission: response })
        })
      }

    }
    else if (index === 1) {
      Permissions.request('photo').then(response => {
        this.setState({ photoPermission: response })
      })
      if (this.state.photoPermission === "authorized") {
        ImagePicker.openPicker({
          width: 200,
          height: 200,
          cropping: true,

        }).then(image => {
          this.setState({
            image: { uri: image.path, width: image.width, height: image.height },
            images: null,
            avatarSource: image.path,
            image: true

          });
        });
      }
      else {
        Alert.alert(
          'Can we access your photos?',
          'We need access so you can set your profile pic',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Permission denied'),
              style: 'cancel',
            },
            this.state.photoPermission == 'undetermined'
              ? { text: 'OK', onPress: this._requestPermission }
              : { text: 'Open Settings', onPress: Permissions.openSettings },
          ],
        )
        Permissions.request('camera').then(response => {
          this.setState({ photoPermission: response })
        })
      }
    }
  }
  _requestPermission = () => {
    Permissions.request('photo').then(response => {
      this.setState({ photoPermission: response })
    })
    Permissions.request('camera').then(response => {
      this.setState({ cameraPermission: response })
    })
  }
  onChaneLink(link) {
    if ((/[ ]{1,}/).test(link)) {
      Alert.alert("Spaces not allowed in a link")
    }
    else {
      this.setState({ link: link, file: link })
    }
  }

  openSelect_Genre() {
    Actions.Select_Genre()
  }
  openSelect_Type() {
    Actions.Select_Type()
  }
  _keyExtractor = (item, index) => item._id;
  render() {
    return (
      <KeyboardAwareScrollView scrollEnabled={false}
        keyboardShouldPersistTaps={Platform.OS === 'ios' ? 'never' : 'always'}
        contentContainerStyle={[styles.container, { backgroundColor: !this.state.openModal ? colorLiteral.WHITE : "rgba(130, 130, 130, 0.5)" }]} showsVerticalScrollIndicator={false}>
        <View style={[styles.container, { backgroundColor: !this.state.openModal ? colorLiteral.WHITE : "rgba(130, 130, 130, 0.5)" }]}>
          <StatusBar
            hidden={false}
            backgroundColor={colorLiteral.STATUSBAR}
            barStyle="dark-content"
          />
          <OfflineNotice />
          <NavigationBar
            backgroundColor={!this.state.openModal ? colorLiteral.WHITE : "rgba(130, 130, 130, 0.5)"}
            title="New Post"
            back
            onLeftButtonPress={() => Actions.account()}
          />
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.openModal}
            onRequestClose={() => null}
          >
            <View style={styles.newPostContainer}>
              <View style={styles.secondContainer}>
                <Text style={styles.modalHeaderText}>Embed URL</Text>
                <Text style={styles.modalHeaderText2}>(YouTube or Vimeo)</Text>
              </View>
              <View style={styles.embedVideoView}>
                <TextInput
                  autoCapitalize={'none'}
                  value={this.state.link}
                  underlineColorAndroid={"transparent"}
                  style={styles.embedText}
                  onChangeText={(link) => this.onChaneLink(link)}
                />
              </View>
              <View style={styles.modalButtonView}>
                <TouchableOpacity onPress={() => this.setState({ openModal: false, link: "" })} style={{ marginTop: '3%' }}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: '3%' }} onPress={() => this.onDone()}>
                  <Text style={styles.cancelText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={styles.addpostView}>
            {this.state.image === true
              ?
              <View style={styles.addPicNew}>
                <TouchableOpacity onPress={() => this.setState({ image: false, buttonAbled: false, file: '' })} style={{ position: 'absolute', right: 10, top: 0 }}><Icons name="cross" size={25} color={colorLiteral.BUTTON} /></TouchableOpacity>
                <Image source={{ uri: this.state.avatarSource }} style={styles.imageProfile} />

              </View>
              :
              <TouchableOpacity disabled={this.state.getvideo ? true : false} style={[styles.addPic, { backgroundColor: !this.state.openModal ? "#d2d2d2" : 'rgba(130, 130, 130, 0.5)' }]} onPress={() => this.showActionsheet()}>
                <Icons name="camera" size={22} color="grey" />
                <Text style={styles.addpicText}>Add Photo/Video</Text>
                <ActionSheet
                  ref={o => this.ActionSheet = o}
                  options={['Take Photo', 'Choose from Library', 'Cancel']}
                  cancelButtonIndex={2}
                  onPress={(index) => { this.handleactionsheet(index) }}
                />
              </TouchableOpacity>

            }
            {this.state.getvideo === false
              ?
              <TouchableOpacity disabled={this.state.image ? true : false} style={[styles.addPic, { backgroundColor: !this.state.openModal ? "#d2d2d2" : 'rgba(130, 130, 130, 0.5)' }]} onPress={() => this.setState({ openModal: true, link: '' })}>
                <Icons name="link" size={25} color="grey" />
                <Text style={styles.addpicText}>Embed URL[Youtube or vimeo] </Text>
              </TouchableOpacity>
              :
              <View style={styles.addPic}>
                <TouchableOpacity onPress={() => this.setState({ getvideo: false, buttonAbled: false, file: '' })} style={{ position: 'absolute', right: 10, top: 0 }}><Icons name="cross" size={25} color={colorLiteral.BUTTON} /></TouchableOpacity>
                <YouTube
                  apiKey="AIzaSyB2kitW96HuzJ8Bik4ZfzNpx_qi9n1uHzc"
                  videoId={this.state.url}
                  play={false}
                  fullscreen={true}
                  loop={true}
                  onReady={e => { this.setState({ isReady: true }) }}
                  onChangeState={e => this.setState({ status: e.state })}
                  onChangeQuality={e => this.setState({ quality: e.quality })}
                  onError={e => this.setState({ error: e.error })}
                  style={styles.videoStyle}
                />
              </View>
            }
          </View>

          <View style={styles.titleView}>
            <View style={{ flex: 0.8, borderWidth: 1, borderColor: "#ccced1", borderRadius: 10, justifyContent: 'center', paddingHorizontal: "2%" }}>
              <TextInput
                maxLength={30}
                selectionColor={colorLiteral.GREY}
                underlineColorAndroid={"transparent"}
                style={styles.postTitle}
                value={this.state.postTitle}
                onChangeText={postTitle => { this.onChangeTitle(postTitle) }}
                placeholder='Post Title'
                placeholderTextColor="grey"
              />
            </View>
          </View>
          <View style={styles.captionView}>
            <View style={{ flex: 0.9, borderWidth: 1, borderRadius: 10, borderColor: "#ccced1", justifyContent: 'flex-start', paddingHorizontal: "2%" }}>
              <TextInput
                multiline={true}
                selectionColor={colorLiteral.GREY}
                underlineColorAndroid={"transparent"}
                style={styles.postTitle}
                value={this.state.Caption}
                onChangeText={Caption => { this.onChangeCaption(Caption) }}
                placeholder="Caption"
                placeholderTextColor="grey"
              />
            </View>
          </View>
          <View style={styles.subView}>
            <TouchableOpacity
              onPress={() => this.openSelect_Genre()}
              style={styles.genreSelect}>
              <Text style={styles.genreSelectText}>{this.state.genre !== "" ? this.state.genre : "Select Genre"}</Text>
              <Icon name="ios-arrow-forward-outline" size={27} color="grey" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.openSelect_Type()} style={styles.genreSelect}>
              <Text style={styles.genreSelectText}>{this.state.types !== "" ? this.state.types : "Select Post Type"}</Text>
              <Icon name="ios-arrow-forward-outline" size={27} color="grey" />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity style={[styles.loginButton, { backgroundColor: !this.state.openModal ? colorLiteral.BUTTON : "#af1a4e" }]} onPress={() => { this.handleSubmit() }}>
              <Text style={[styles.loginText, { color: !this.state.openModal ? colorLiteral.WHITE : "#D1D1D1", }]}>Continue</Text>
            </TouchableOpacity></View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}


function mapUser(state) {
  return {
    setGenres: state.setGenres,
    setTypes: state.setTypes,

  };
}

export default connect(mapUser)(NewPost);