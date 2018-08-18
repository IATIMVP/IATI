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
  KeyboardAvoidingView,
  Alert,
  Platform,
  Modal,
  StatusBar
} from "react-native";
import { Actions } from "react-native-router-flux";
import FBSDK from 'react-native-fbsdk';
const {
  LoginManager,
  AccessToken
} = FBSDK;

import { connect } from "react-redux";
import GoogleSignIn from 'react-native-google-sign-in';
import { signup } from "../actions/SignupAction";
import { checkuser, resendmail } from "../actions/LoginAction";
import { selectuserName } from "../actions/SelectUserNameAction";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { colorLiteral } from "../constants/Color";
import { Google_API_KEY } from "../constants/Constants";
import { styles } from "../styles/SignupStyle";
import ImagePicker from 'react-native-image-crop-picker';
const WINDOW = Dimensions.get("window");
import OfflineNotice from "./common/OfflineNotice";
import ActionSheet from 'react-native-actionsheet';
import Permissions from 'react-native-permissions';
let checkCamera = null
let checkPhoto = null
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      nameEmpty: false,
      emailEmpty: false,
      passwordEmpty: false,
      confirmPasswordEmpty: false,
      avatarSource: "https://www.1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png",
      nameText: false,
      emailText: false,
      emailValid: false,
      passwordText: false,
      cpasswordText: false,
      passwordMatch: true,
      nameInvalid: false,
      passwordInvalid: false,
      loading: false,
      emailNotValid: false,
      notValidPassword: false
    };
  }
  componentDidMount() {
    Permissions.checkMultiple(['camera', 'photo']).then(response => {
      this.setState({
        cameraPermission: response.camera,
        photoPermission: response.photo,
      })
    })
  }
  componentWillReceiveProps(nextProp) {
    if (nextProp.signupReducer.loading === true) {
      this.setState({ loading: true })
    }
    if (nextProp.signupReducer.error !== '') {
      Alert.alert(nextProp.signupReducer.error)
    }
  }
  signup() {
    // this.setState({emailNotValid:false})
    if (this.state.name === "") {
      this.setState({ nameText: true })
    }
    if (! /^[A-Za-z\s]+$/.test(this.state.name)) {
      this.setState({ nameInvalid: true, name: "" })
    }
    if (this.state.email === "") {
      this.setState({ emailText: true })
    }
    if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(this.state.email)) {
      this.setState({ emailValid: true, email: "" })
    }
    if (this.state.password === "") {
      this.setState({ passwordText: true })
    }
    if ((!(/^(?=.*([A-Za-z!@#$%^&*_-]))+(?=.*[!@#$%^&*_-])[\w!@#$%^&*_-]{8,}$/).test(this.state.password) && this.state.password !== "")) {
      this.setState({ passwordInvalid: true, password: "" })
    }
    if (this.state.confirmPassword === "") {
      this.setState({ cpasswordText: true })
    }
    if (!(/^((?=.*[!@#$%^&*_-]))$/).test(this.state.password) && this.state.notValidPassword === true) {
      this.setState({ confirmPassword: "" })
    }
    if (this.state.password !== this.state.confirmPassword && this.state.password !== "" && this.state.confirmPassword !== "") {
      this.setState({
        confirmPassword: "",
        passwordMatch: false,
        passwordEmpty: false,
        cpasswordText: true,
        passwordInvalid: false
      })
    }
    if (this.state.name !== "" && this.state.email !== "" && (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(this.state.email) && this.state.password !== "" && this.state.confirmPassword !== "" && this.state.password === this.state.confirmPassword && (/^(?=.*[A-Za-z!@#$%^&*_-])+(?=.*[!@#$%^&*_-])[\w!@#$%^&*_-]{8,}$/).test(this.state.password)) {
      let data = {
        "email": this.state.email,
        "password": this.state.password,
        "file": this.state.avatarSource,
        "loginType": 1,
        "name": this.state.name,
        "check": "manual"
      }
      Actions.SelectUsername({ data: data });
    }
  }

  onNameChange(name) {
    if (name.length === 0) {
      this.setState({ nameEmpty: true, name: name, })
    } else {
      this.setState({ name: name, nameEmpty: false, nameText: false, nameInvalid: false });
    }
  }

  onEmailChange(email) {
    if (email.length === 0) {
      this.setState({ emailNotValid: false, emailEmpty: true, email: email.trim() })
    }
    else if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(this.state.email)) {
      this.setState({ emailNotValid: true, email: email.trim(), emailEmpty: false, emailText: false, emailValid: false })
    }
    else if ((/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(this.state.email))

      this.setState({ emailNotValid: false, email: email.trim(), emailEmpty: false, emailText: false, emailValid: false })
    if (email.length === 0) {
      this.setState({ emailNotValid: false, emailEmpty: true, email: email.trim() })
    }
    else {
      this.props.selectuserName(email, "email")
    }

  }

  onPasswordChange(password) {
    if (password.length <= 1) {
      this.setState({ notValidPassword: false, passwordEmpty: true, password: password, passwordMatch: true, cpasswordText: false, passwordInvalid: false })
    }
    if ((!(/^(?=.*([A-Za-z!@#$%^&*_-]))+(?=.*[!@#$%^&*_-])[\w!@#$%^&*_-]{8,}$/).test(password))) {
      this.setState({ notValidPassword: true, password: password, passwordEmpty: false, passwordText: false, cpasswordText: false })
    }
    if (((/^(?=.*([A-Za-z!@#$%^&*_-]))+(?=.*[!@#$%^&*_-])[\w!@#$%^&*_-]{8,}$/).test(password))) {
      this.setState({ notValidPassword: false, password: password, passwordEmpty: false, passwordInvalid: false, passwordText: false, cpasswordText: false })
    }
    // else {
    //   this.setState({ notValidPassword: false, password: password, passwordEmpty: false, passwordText: false, passwordInvalid: false, passwordMatch: true, cpasswordText: false });
    // }
  }

  onConfirmPasswordChange(confirmPassword) {
    if (confirmPassword === 0) {
      this.setState({ confirmPasswordEmpty: true, confirmPassword: confirmPassword })
    } else {
      this.setState({ confirmPassword: confirmPassword, confirmPasswordEmpty: false, cpasswordText: false });
    }
  }
  loginWithFacebook() {
    LoginManager.logInWithReadPermissions(["public_profile"]).then(
      (result) => {

        if (result.isCancelled) {
          this.setState({ fbloading: false })
        }
        else {
          this.setState({ fbloading: true })
          AccessToken.getCurrentAccessToken().then(data => {
            const { accessToken } = data;
            console.log("fb  access token is ", accessToken);
            fetch(
              "https://graph.facebook.com/v2.5/me?fields=id,first_name,last_name,picture,email,name&access_token=" +
              accessToken
            )
              .then(response => response.json())
              .then(data => {

                console.log("Fb user data is : ", JSON.stringify(data.picture));
                let data1 = {
                  "file": data.picture.data.url,
                  "email": data.email ? data.email : "",
                  "name": data.name,
                  "token": accessToken,
                  "username": data.first_name,
                  "type": 2,
                  "userId": data.id

                }
                this.setState({ fbloading: false })
                this.props.checkuser(data1)
              })
              .catch(() => {
                this.setState({ fbloading: false })
                console.log("ERROR GETTING DATA FROM FACEBOOK");
              });
          });
        }
      },
      (error) => {
        Alert.alert("Login fail with error: " + error);
      }
    );
  }
  async loginWithGoogle() {
    await GoogleSignIn.configure({
      clientID: Platform.OS === 'android' ? Google_API_KEY.Android_Id_Google_SignIn : Google_API_KEY.IOS_Id_Google_SignIn,
      scopes: ['openid', 'email', 'profile'],
      shouldFetchBasicProfile: true
    });
    GoogleSignIn.signInPromise().then((user) => {
      console.log('signInPromise resolved', user);
      let data = {
        "file": user.photoUrl320,
        "email": user.email,
        "name": user.name,
        "token": user.accessToken,
        "username": user.givenName,
        "type": 3,
        "userId": user.userID
      }
      this.props.checkuser(data)
    }, (e) => {
      console.log('signInPromise rejected', e);;
    })
  }

  showActionsheet() {
    this.ActionSheet.show()
  }
  handleactionsheet(index) {



    if (index == 0) {
      Permissions.request('camera').then(response => {
        console.log("response Camera===>", response)
        checkCamera = response
      })
      if (checkCamera === "authorized") {
        ImagePicker.openCamera({
          cropping: true,
          width: 500,
          height: 500,
          includeExif: true,
          cropperCircleOverlay: true,
        }).then(image => {
          console.log('received image', image);
          this.setState({
            image: { uri: image.path, width: image.width, height: image.height },
            images: null,
            avatarSource: image.path ? image.path : "https://www.1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png",
            buttonAbled: true,
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
            checkCamera == 'undetermined'
              ? { text: 'OK', onPress: this._requestPermissionCamera }
              :
              { text: 'Open Settings', onPress: Permissions.openSettings },
          ],
        )


      }

    }
    else if (index === 1) {
      Permissions.request('photo').then(response => {
        console.log("responseresponseresponseresponse", response)
        this.setState({ photoPermission: response })
      })
      if (this.state.photoPermission === "authorized") {
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true,
          cropperCircleOverlay: true,
        }).then(image => {
          this.setState({
            image: { uri: image.path, width: image.width, height: image.height },
            images: null,
            avatarSource: image.path,
            buttonAbled: true,
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
              ? { text: 'OK', onPress: this._requestPermissionPhoto }
              :
              { text: 'Open Settings', onPress: Permissions.openSettings },
          ],
        )
        Permissions.request('camera').then(response => {
          this.setState({ photoPermission: response })

        })
      }
    }
  }
  _requestPermissionCamera = () => {

    Permissions.request('camera').then(response => {
      checkCamera = response
      ImagePicker.openCamera({
        cropping: true,
        width: 500,
        height: 500,
        includeExif: true,
        cropperCircleOverlay: true,
      }).then(image => {
        console.log('received image', image);
        this.setState({
          image: { uri: image.path, width: image.width, height: image.height },
          images: null,
          avatarSource: image.path ? image.path : "https://www.1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png",
          buttonAbled: true,
        });
      }).catch(e => console(e));

    })
  }

  _requestPermissionPhoto = () => {

    Permissions.request('photo').then(response => {
      this.setState({ photoPermission: response })
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        cropperCircleOverlay: true,
      }).then(image => {
        this.setState({
          image: { uri: image.path, width: image.width, height: image.height },
          images: null,
          avatarSource: image.path,
          buttonAbled: true,
        });
      });
    })


  }

  render() {
    let { isloading, selectdata,
      error,
      type } = this.props.SelectUserNameReducer
    let { loading } = this.props.checkuserReducer
    let { fbloading } = this.state
    if (fbloading || loading) {
      return (
        <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
          <ActivityIndicator />
        </View>
      )
    }
    else
      return (
        this.state.loading ?
          <View style={{ flex: 0.1, justifyContent: 'center', paddingTop: '40%' }}><ActivityIndicator /></View> :
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps={Platform.OS === 'ios' ? 'never' : 'always'}
            contentContainerStyle={[styles.container, { backgroundColor: !this.state.openModal ? colorLiteral.WHITE : "rgba(130, 130, 130, 0.5)" }]} showsVerticalScrollIndicator={false}>
            <View style={[styles.container, { backgroundColor: colorLiteral.WHITE }]}>
              <StatusBar
                hidden={false}
                backgroundColor={colorLiteral.STATUSBAR}
                barStyle="dark-content"
              />
              <OfflineNotice />

              <View style={styles.imageContainer}>
                <TouchableOpacity
                  onPress={() => this.showActionsheet()}
                >
                  <Image
                    style={styles.logo}
                    source={{ uri: this.state.avatarSource }}
                  />
                  <View style={styles.addImage}>
                    <Text style={styles.addImageText}>+</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <ActionSheet
                ref={o => this.ActionSheet = o}
                options={['Take Photo', 'Choose from Library', 'Cancel']}
                cancelButtonIndex={2}
                onPress={(index) => { this.handleactionsheet(index) }}
              />

              <View style={styles.inputContainer}>
                <View style={styles.nameInput}>
                  <TextInput
                    autoCorrect={false}
                    returnKeyType={"next"}
                    maxLength={30}
                    onChangeText={(name) => this.onNameChange(name)}
                    selectionColor={colorLiteral.GREY}
                    underlineColorAndroid={"transparent"}
                    autoCapitalize={"words"}
                    style={styles.email}
                    value={this.state.name}
                    placeholder={this.state.nameText ? "Please enter your name." : this.state.nameInvalid ? "Name contains invalid characters." : "Name"}
                    placeholderTextColor={this.state.nameText || this.state.nameInvalid ? colorLiteral.BUTTON : colorLiteral.GREY}
                    onSubmitEditing={() => { this.firstTextInput.focus(); }}
                  />
                </View>
                <View style={styles.emailInput}>
                  <TextInput
                    autoCorrect={false}
                    returnKeyType={"next"}
                    maxLength={40}
                    selectionColor={colorLiteral.GREY}
                    keyboardType={"email-address"}
                    underlineColorAndroid={"transparent"}
                    autoCapitalize={"none"}
                    style={styles.email}
                    value={this.state.email}
                    onChangeText={(email) => this.onEmailChange(email)}
                    placeholder={this.state.emailText ? "Please enter your email" : this.state.emailValid ? "Please enter a valid email." : "Email"}
                    placeholderTextColor={this.state.emailText || this.state.emailValid ? colorLiteral.BUTTON : "grey"}
                    onSubmitEditing={() => { this.secondTextInput.focus(); }}
                    ref={(input) => { this.firstTextInput = input; }}
                  />
                </View>
                {this.state.emailNotValid && selectdata && selectdata.status === 201 && type === "email" ?
                  <View style={{ flex: 0.02, alignItems: 'flex-end' }}><Text style={{ color: colorLiteral.BUTTON, marginRight: '2%' }}>Email not valid</Text></View> :
                  type === 'email' && error && error.status === 200 && this.state.email != "" ?
                    <View style={{ flex: 0.02, alignItems: 'flex-end' }}><Text style={{ color: colorLiteral.BUTTON, marginRight: '2%' }}>Email already exists</Text></View> :
                    <View style={{ flex: 0.02, alignItems: 'flex-end' }}></View>}
                <View style={styles.passwordInput}>
                  <TextInput
                    autoCorrect={false}
                    returnKeyType={"next"}
                    maxLength={20}
                    secureTextEntry
                    selectionColor={colorLiteral.GREY}
                    underlineColorAndroid={"transparent"}
                    autoCapitalize={"none"}
                    style={styles.email}
                    value={this.state.password}
                    onChangeText={(password) => this.onPasswordChange(password)}
                    placeholder={this.state.passwordText ? "Please enter a password" : "Password"}
                    placeholderTextColor={this.state.passwordText ? colorLiteral.BUTTON : colorLiteral.GREY}
                    onSubmitEditing={() => { this.thirdTextInput.focus(); }}
                    ref={(input) => { this.secondTextInput = input; }}
                  />
                </View>
                <View style={styles.confirmPasswordInput}>
                  <TextInput
                    autoCorrect={false}
                    returnKeyType={"done"}
                    maxLength={20}
                    autoCapitalize={"none"}
                    underlineColorAndroid={"transparent"}
                    secureTextEntry
                    selectionColor={colorLiteral.GREY}
                    style={styles.email}
                    value={this.state.confirmPassword}
                    onChangeText={(confirmPassword) => this.onConfirmPasswordChange(confirmPassword)}
                    placeholder={this.state.cpasswordText && !this.state.passwordMatch && !this.state.passwordInvalid ? "Your passwords don’t match. " : this.state.passwordMatch && this.state.cpasswordText ? "Please re-enter the password" : this.state.passwordMatch && !this.state.cpasswordText ? "Confirm Password" : null}
                    placeholderTextColor={this.state.cpasswordText || !this.state.passwordMatch ? colorLiteral.BUTTON : colorLiteral.GREY}
                    ref={(input) => { this.thirdTextInput = input; }}
                    onEndEditing={() => { error && error.status === 200 ? Alert.alert("Email already exists") : this.signup() }}
                  />
                </View>
                <View style={{ flex: 0.15 }}>
                  <Text style={{ color: colorLiteral.BUTTON, fontSize: WINDOW.width * 0.029, paddingTop: '1%' }}>{this.state.notValidPassword === true && this.state.password != "" ? "Your password must include at least one symbol, and" : null}</Text>
                  <Text style={{ color: colorLiteral.BUTTON, fontSize: WINDOW.width * 0.029, textAlign: 'center' }}>{this.state.notValidPassword === true && this.state.password != "" ? "be atleast 8 characters long." : null}</Text>
                </View>
                <View style={styles.buttonInput}>
                  <TouchableOpacity disabled={(error && error.status === 200) ? true : false} style={styles.loginButton} onPress={() => this.signup()}>
                    <Text style={styles.loginText}>Sign up</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.footer}>
                <Text style={styles.orsignupText}>or sign up with : </Text>
                <View style={styles.footerButtons}>
                  <TouchableOpacity
                    style={[styles.googleButton, { backgroundColor: this.state.openModal ? colorLiteral.GBTN : colorLiteral.RED }]}
                    onPress={() => {
                      this.loginWithGoogle()
                    }}
                  >
                    <Text style={[styles.socialButtonText, { color: this.state.openModal ? colorLiteral.MEDIUM_GREY : colorLiteral.WHITE }]}>Google+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.facebookButton, { backgroundColor: this.state.openModal ? colorLiteral.FBBTN : colorLiteral.FBBTN }]}
                    onPress={() => {
                      this.loginWithFacebook()
                    }}
                  >
                    <Text style={[styles.socialButtonText, { color: this.state.openModal ? colorLiteral.MEDIUM_GREY : colorLiteral.WHITE }]}>Facebook</Text>

                  </TouchableOpacity>
                </View>
                <View style={styles.footerText}>
                  <Text style={styles.nextText}>By signing in, you agree to our</Text>
                  <View style={styles.nextView}>
                    <TouchableOpacity onPress={() => { Alert.alert("Terms of service") }}>
                      <Text style={[styles.modalText, { color: this.state.openModal ? colorLiteral.DARK_PINK : colorLiteral.BUTTON }]}>Terms of Service</Text>
                    </TouchableOpacity>
                    <Text style={styles.andText}> & </Text>
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert("Privacy Policy")
                      }}
                    >
                      <Text style={[styles.privatePolicy, { color: this.state.openModal ? colorLiteral.DARK_PINK : colorLiteral.BUTTON }]}>Privacy policy</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.bottomView}>
                    <Text style={styles.bottomText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => { Actions.pop() }} >
                      <Text style={[styles.logHere, { color: this.state.openModal ? colorLiteral.DARK_PINK : colorLiteral.BUTTON }]}>Log in here.</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
      );
  }
};
function mapUser(state) {
  return {
    signupReducer: state.signupReducer,
    SelectUserNameReducer: state.SelectUserNameReducer,
    checkuserReducer: state.checkuserReducer

  };
}
export default connect(mapUser, { signup, checkuser, selectuserName })(Signup);

