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
  StatusBar
} from "react-native";
import FBSDK from 'react-native-fbsdk';
const {
  LoginManager,
  AccessToken
} = FBSDK;
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { login, resendmail, checkuser } from "../actions/LoginAction";
import GoogleSignIn from 'react-native-google-sign-in';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colorLiteral } from "../constants/Color";
import { Google_API_KEY } from "../constants/Constants";
import { styles } from "../styles/LoginStyle";
import Icons from 'react-native-vector-icons/Entypo';
import OfflineNotice from "./common/OfflineNotice";
import Icon from 'react-native-vector-icons/Ionicons';

import { ifIphoneX } from 'react-native-iphone-x-helper'

const WINDOW = Dimensions.get("window");
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailText: false,
      passwordText: false,
      errorLogin: false,
      loginErr: false,
      openModal: false,
      requesting: false,
      registeredEmail: "",
      registeredEmailText: false,
      wrongEmailErr: false,
      viewShow: true,
      resetDone: false,
      loginloading: false,
      regEmailErr: false,
      mail: "",
    };
  }
  componentDidMount() { }

  componentWillReceiveProps(nextProp) {
    if (nextProp.loginReducer.loading) {
      this.setState({ loginloading: true })
    }
    if (nextProp.loginReducer.error) {
      this.setState({ error: true, loginloading: false })
    }
    if (nextProp.forgotpasswordReducer.loading === true) {
      this.setState({ requesting: true })
    }
    if (nextProp.forgotpasswordReducer.reset_mailData) {
      this.setState({ resetDone: true, requesting: false })
    }
    if (nextProp.forgotpasswordReducer.error) {
      this.setState({ wrongEmailErr: true, requesting: false })
    }
  }

  handleSubmit() {
    let logindata = {
      'email': this.state.email,
      'password': this.state.password
    }
    if (this.state.email === "" && this.state.password === "") {
      this.setState({ viewShow: true })
    }
    else {
      if (this.state.email === "") {
        this.setState({ emailText: true })
      }
      if (this.state.password === "") {
        this.setState({ passwordText: true })
      }
      if (this.state.email !== "" && this.state.password !== "") {
        this.props.login(logindata);
      }
    }
  }
  handleSubmitButton() {
    this.setState({ viewShow: false })
    let logindata = {
      'email': this.state.email,
      'password': this.state.password,
      'type': 1
    }
    if (this.state.email === "") {
      this.setState({ emailText: true })
    }
    if (this.state.password === "") {
      this.setState({ passwordText: true })
    }
    if (this.state.email !== "" && this.state.password !== "") {
      this.props.login(logindata);
    }

  }

  onChangeEmail(email) {
    if (this.state.email.length === 1) {
      this.setState({ email, emailText: true, passwordText: false, error: false, })
    }
    else {
      this.setState({ email, emailText: false, error: false, })
    }
  }
  onChangePassword(password) {
    this.setState({ password, passwordText: false, error: false, })
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

                console.log("Fb user data is : ", data);

                let data1 = {
                  "file": data.picture.data.url,
                  "email": data.email ? data.email : '',
                  "name": data.name,
                  "username": data.first_name,
                  "type": 2,
                  "userId": data.id,
                  "token": accessToken
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
        this.setState({ fbloading: false })
        alert("Login fail with error: " + error);
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
        "email": user.email,
        "password": "ASdasas",
        "type": 3,
        "userId": user.userID,
        "token": user.accessToken,
        "name": user.name,
        "username": user.givenName,
        "file": user.photoUrl320
      }
      this.props.checkuser(data)
    }, (e) => {
      console.log('signInPromise rejected', e);
    })
  }

  forgotPasswordSubmit() {
    if (this.state.registeredEmail === "") {
      this.setState({ registeredEmailText: true })
    }
    if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(this.state.registeredEmail)) {
      this.setState({ regEmailErr: true, registeredEmail: "" })
    }
    if (this.state.registeredEmail !== "" && (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(this.state.registeredEmail)) {
      if (this.state.registeredEmail.length >= 3) {
        let email = this.state.registeredEmail

        let splitEmail = email.split("@");
        let characters = splitEmail[0].toString().split("");
        let starArray = [];
        characters.map((item, index) => {
          if (item) {
            starArray.push("*");
          }
        })
        console.log(starArray.join("") + "@" + splitEmail[1]);
        this.setState({ mail: starArray.join("") + "@" + splitEmail[1] })
      }
      this.props.resendmail(this.state.registeredEmail)
    }

  }

  onChange(registeredEmail) {
    if (this.state.registeredEmail.length == 1) {
      this.setState({ registeredEmail: registeredEmail, wrongEmailErr: false })
    }
    else {
      this.setState({ registeredEmail: registeredEmail, regEmailErr: false, registeredEmailText: false })
    }
  }
  onEmailEndEditing() {
    this.setState({ viewShow: true })
  }

  render() {
    let { loading } = this.props.checkuserReducer
    let { fbloading } = this.state
    if (fbloading || loading) {
      return (
        <View style={[styles.container,{ justifyContent:"center" ,  alignItems : "center" }]}>
          <ActivityIndicator />
        </View>
      )
    }
    else
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
          <View style={styles.logoContainer}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.openModal}
              onRequestClose={() => null}
            >
              <View style={styles.mainContainer}>
                <View style={styles.mainView}>
                  <View style={styles.selectView}>
                    <Text style={styles.text}>Forgot your password?</Text>
                    <TouchableOpacity onPress={() => this.setState({ openModal: false, resetDone: false, registeredEmail: '' })} style={{ flex: 0.1, backgroundColor: 'transparent', alignItems: 'flex-end', bottom: 5 }}>
                      <Icons name="cross" size={30} color="grey" />
                    </TouchableOpacity>
                  </View>
                  {this.state.resetDone === false ?
                    <View style={{ flex: 0.57, backgroundColor: 'white' }}>
                      <View style={{ flex: 0.4, alignItems: "center", justifyContent: 'center' }}>
                        <Text style={styles.text2}>Enter your email and we'll send</Text>
                        <Text style={styles.text2}>you a link to reset your password.</Text>
                      </View>
                      <View style={{ flex: 0.3, marginHorizontal: '3%', borderWidth: 1, borderColor: "grey", borderRadius: 15, marginTop: "0%" }}>
                        <TextInput
                          autoCorrect={false}
                          returnKeyType={"done"}
                          keyboardType={"email-address"}
                          maxLength={30}
                          selectionColor={colorLiteral.GREY}
                          underlineColorAndroid={"transparent"}
                          autoCapitalize={"none"}
                          style={styles.email1}
                          value={this.state.registeredEmail}
                          onChangeText={registeredEmail => { this.onChange(registeredEmail) }}
                          placeholder={this.state.registeredEmailText ? "Please enter your email." : this.state.regEmailErr ? "Please enter a valid email" : "Email "}
                          placeholderTextColor={this.state.registeredEmailText || this.state.regEmailErr ? colorLiteral.BUTTON : "grey"}
                          onEndEditing={() => { this.forgotPasswordSubmit() }}
                        />
                      </View>
                      {this.state.wrongEmailErr && !this.state.regEmailErr ?
                        <View style={{ flex: 0.1, alignItems: "center" }}>
                          <Text style={styles.text3}>The email you entered is not associated</Text>
                          <Text style={styles.text3}>with an account. Please try again.</Text>
                        </View> : null}
                    </View>
                    :
                    <View style={{ flex: 0.555, backgroundColor: 'white', alignItems: 'center' }}>
                      <Text style={styles.text5}>We sent an email to</Text>
                      <Text style={styles.text5}>{this.state.mail} with</Text>
                      <Text style={styles.text5}>a link to get back into</Text>
                      <Text style={styles.text5}>your account</Text>
                    </View>
                  }
                  {this.state.resetDone === false ?
                    <View style={{ alignItems: 'center', justifyContent: "center" }}>
                      <TouchableOpacity
                        disabled={this.state.requesting}
                        style={styles.loginButton}
                        onPress={() => { this.forgotPasswordSubmit() }}>
                        {this.state.requesting ? <ActivityIndicator /> : <Text style={styles.loginText}>Request Password Reset</Text>}
                      </TouchableOpacity>
                    </View>
                    :
                    <View style={{ alignItems: 'center', justifyContent: "center" }}>
                      <TouchableOpacity
                        disabled={this.state.requesting}
                        style={styles.loginButton}
                        onPress={() => { this.setState({ openModal: false, resetDone: false, registeredEmail: '' }) }}>
                        {this.state.requesting ? <ActivityIndicator /> : <Text style={styles.loginText}>OK</Text>}
                      </TouchableOpacity>
                    </View>
                  }
                </View>
              </View>

            </Modal>
            <TouchableOpacity style={{ flex: 0.1, ...ifIphoneX({ top: 40 }, { top: 40 }), left: 10 }} onPress={() => Actions.pop()}>
              <Icon
                name='ios-arrow-back'
                size={30}
              />
            </TouchableOpacity>
            <View style={{ flex: 0.9 }}>
              <Image
                style={styles.logo}
                source={require('../constants/Images/Login.png')}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            {this.state.viewShow ?
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.errStyle}>Please login to continue </Text>
              </View> :
              <View style={{}}>
                <Text style={styles.errStyle}> </Text>
              </View>}
            <View style={styles.emailInput}>
              <TextInput
                autoCorrect={false}
                returnKeyType={"next"}
                onFocus={() => this.setState({ viewShow: false })}
                onEndEditing={() => this.onEmailEndEditing()}
                maxLength={30}
                selectionColor={colorLiteral.GREY}
                underlineColorAndroid={"transparent"}
                autoCapitalize={"none"}
                style={styles.email}
                value={this.state.email}
                onChangeText={email => { this.onChangeEmail(email) }}
                placeholder={this.state.emailText ? "Please enter username or email." : "Username or Email"}
                placeholderTextColor={this.state.emailText ? colorLiteral.BUTTON : "grey"}
                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.passwordInput}>
              <TextInput
                autoCorrect={false}
                returnKeyType={"done"}
                onFocus={() => this.setState({ viewShow: false })}
                underlineColorAndroid={"transparent"}
                secureTextEntry
                selectionColor={colorLiteral.GREY}
                style={styles.email}
                value={this.state.password}
                onChangeText={password => { this.onChangePassword(password) }}
                placeholder={this.state.passwordText ? "Please enter your password." : "Password"}
                placeholderTextColor={this.state.passwordText ? colorLiteral.BUTTON : colorLiteral.GREY}
                ref={(input) => { this.secondTextInput = input; }}
                onEndEditing={() => { this.handleSubmit() }}
              />
            </View>
            {this.state.error ?
              <View style={{ flex: 0.2, alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                <Text style={styles.errStyle}>The username/email or password is incorrect.</Text>
                <TouchableOpacity onPress={() => { this.setState({ openModal: true, wrongEmailErr: false, regEmailErr: false, registeredEmail: '', registeredEmailText: false }) }}>
                  <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
                </TouchableOpacity>
              </View>
              :
              <TouchableOpacity onPress={() => { this.setState({ openModal: true, wrongEmailErr: false, regEmailErr: false, registeredEmail: '', requesting: false, registeredEmailText: false }) }} style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
              </TouchableOpacity>
            }
            <View style={styles.buttonInput}>


              <TouchableOpacity style={styles.loginButton} onPress={() => { this.handleSubmitButton() }}>
                {this.state.loginloading === true ? <ActivityIndicator color={colorLiteral.WHITE} /> : <Text style={styles.loginText}>Login</Text>}
              </TouchableOpacity>

            </View>
          </View>
          <View style={styles.footer}>
            <Text style={styles.text0}>Or login with : </Text>
            <View style={styles.footerButtons}>
              <TouchableOpacity style={styles.googleButton} onPress={() => { this.loginWithGoogle() }} >
                <Text style={styles.socialButtonText}>Google+</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.facebookButton} onPress={() => { this.loginWithFacebook() }} >

                {loading || fbloading ? <ActivityIndicator /> : <Text style={styles.socialButtonText}>Facebook</Text>}

              </TouchableOpacity>
            </View>
            <View style={styles.footerTextView}>
              <Text style={styles.footerText}>By signing in, you agree to our</Text>
              <View style={styles.nextView}>
                <TouchableOpacity onPress={() => { Alert.alert("under development") }}>
                  <Text style={styles.textStyle}>Terms of Service</Text>
                </TouchableOpacity>
                <Text style={styles.andText}> & </Text>
                <TouchableOpacity onPress={() => { Alert.alert("under development") }}>
                  <Text style={styles.textStyle}>Privacy Policy</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.signHereView}>
                <Text style={styles.andText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => { Actions.signup() }}>
                  <Text style={styles.textStyle}>Sign up here.</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}


function mapUser(state) {
  return {
    loginReducer: state.loginReducer,
    forgotpasswordReducer: state.forgotpasswordReducer,
    checkuserReducer: state.checkuserReducer
  };
}

export default connect(mapUser, { login, resendmail, checkuser })(Login);