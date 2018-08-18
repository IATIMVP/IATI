import {
  StyleSheet,
  Dimensions,
  Platform
} from "react-native";
import { colorLiteral } from "../constants/Color";
const WINDOW = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    height: (Platform.OS === 'ios') ? WINDOW.height * 0.95 : WINDOW.height * 0.94,
    backgroundColor: colorLiteral.WHITE
  },
  logoContainer: {
    flex: 0.25,
    flexDirection:'row'
  },
  inputContainer: {
    flex: 0.35,
    paddingHorizontal: WINDOW.width / 8,
  },
  emailInput: {
    flex: 0.3,
    borderBottomColor: colorLiteral.BUTTON,
    borderBottomWidth: 2,
    flexDirection: 'row'
  },
  forgotPassword: {
    alignItems: "flex-end",paddingTop:'4%'
  },
  forgotPasswordText: {
    fontSize: WINDOW.width * 0.0321,
    color: colorLiteral.GREY
  },
  passwordInput: {
    flex: 0.3,
    borderBottomWidth: 2,
    borderBottomColor: colorLiteral.BUTTON,
    flexDirection: 'row',
  },
  buttonInput: {
    flex: 0.35,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flex: 0.32,
    alignItems: "center",
    justifyContent: 'center',
  },
  footerButtons: {
    flex: 0.3,
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: '1%'
  },
  footerText: {
    fontSize: WINDOW.width * 0.036,
    textAlign: "center"
  },
  footerTextView: {
    flex: 0.5,
  },
  text: {
    flex:0.9,
    fontSize: WINDOW.width * 0.045,
    fontWeight: "700",
    color: colorLiteral.GREY,
    textAlign:"center",
    marginLeft:'7%'
  },
  nextView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontSize: WINDOW.width * 0.036,
    textAlign: "center",
    color: colorLiteral.BUTTON
  },
  errStyle: {
    fontSize: WINDOW.width * 0.031,
    color: colorLiteral.BUTTON
  },
  andText: {
    fontSize: WINDOW.width * 0.036,
    textAlign: "center"
  },
  signHereView: {
    flex: 0.9,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  logo: {
    height: WINDOW.width * 0.21,
    width: WINDOW.width * 0.22,
    top:50,left:112
  },
  email: {
    color: colorLiteral.GREY,
    flex: 0.9,
    fontSize: WINDOW.width * 0.038

  },
  email1: {
    color: colorLiteral.GREY,
    flex: 0.9,
    fontSize: WINDOW.width * 0.036,
    marginLeft:'4%'
  },
  loginButton: {
    alignItems: "center",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    backgroundColor: colorLiteral.BUTTON,
    width: WINDOW.width / 1.9,
    height: WINDOW.width * 0.115,
    borderRadius: 21,
    justifyContent: "center"
  },
  loginText: {
    color: colorLiteral.WHITE,
    fontWeight: "700",
    fontSize: (Platform.OS === 'ios') ? WINDOW.width * 0.04 : WINDOW.width * 0.04
  },
  googleButton: {
    alignItems: "center",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    backgroundColor: colorLiteral.RED,
    marginHorizontal: 10,
    width: WINDOW.width / 2.5,
    height: WINDOW.width * 0.11,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  facebookButton: {
    alignItems: "center",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    backgroundColor: colorLiteral.FBBTN,
    marginHorizontal: 10,
    width: WINDOW.width / 2.5,
    height: WINDOW.width * 0.11,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  socialButtonText: {
    color: colorLiteral.WHITE,
    fontWeight: "700",
    fontSize: WINDOW.width * 0.04
  },
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colorLiteral.BGCOLOR
  },
  mainView: {
    backgroundColor: colorLiteral.WHITE,
    height: WINDOW.height / 2.5,
    width: WINDOW.width / 1.2,
    borderRadius: 30,
    paddingHorizontal:'4%'
  },
  selectView: {
    flex: 0.25,
    flexDirection:'row',
    alignItems: "center",
  },
  text0: {
    fontSize: (Platform.OS === 'ios') ? WINDOW.width * 0.04 : WINDOW.width * 0.045,
    fontWeight: "600",
    color: colorLiteral.GREY,
    paddingBottom: "1%"
  },
  text2: {
    fontSize: WINDOW.width * 0.035,
    textAlign: "center",
    color: colorLiteral.GREY
  },
  text5: {
    fontSize: WINDOW.width * 0.042,
    textAlign: "center",
    color: colorLiteral.GREY
  },
  text3: {
    fontSize: WINDOW.width * 0.03,
    textAlign: "center",
    color: colorLiteral.BUTTON
  },
  modalOpt: {
    flex: 0.25,
    justifyContent: "center",
    marginLeft: 20
  },
  buttonText: {
    color: colorLiteral.WHITE,
    fontWeight: "700",
    fontSize: WINDOW.width * 0.03
  },
  onClickModal: {
    flex: 0.2,

    alignItems: "center",
    justifyContent: "center"
  },
  okText: {
    fontSize: WINDOW.width * 0.04,
    fontWeight: "400",
    color: colorLiteral.BUTTON

  },
})