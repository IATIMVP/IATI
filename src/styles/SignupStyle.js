import {
  StyleSheet,
  Dimensions,
  Platform
} from "react-native";
import { colorLiteral } from "../constants/Color";
const WINDOW = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    height: (Platform.OS === 'ios') ? WINDOW.height : WINDOW.height * 0.965,
    backgroundColor: "#ffffff"
  },
  imageContainer: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flex: 0.43,
    paddingHorizontal: WINDOW.width / 9,
  },
  emailInput: {
    flex: 0.17,
    borderBottomColor: colorLiteral.BUTTON,
    borderBottomWidth: 2,
    flexDirection: 'row'
  },
  passwordInput: {
    flex: 0.17,
    borderBottomColor: colorLiteral.BUTTON,
    borderBottomWidth: 2,
    flexDirection: 'row'
  },
  nameInput: {
    flex: 0.17,
    borderBottomColor: colorLiteral.BUTTON,
    borderBottomWidth: 2,
    flexDirection: 'row'
  },
  confirmPasswordInput: {
    flex: 0.17,
    borderBottomColor: colorLiteral.BUTTON,
    borderBottomWidth: 2,
    flexDirection: 'row',
  },
  buttonInput: {
    flex: 0.1,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flex: 0.3,
    alignItems: "center",
  },
  footerButtons: {
    flex: 0.35,
    flexDirection: "row",
    alignItems: "center"
  },
  footerText: {
    flex: 0.65,
  },
  logo: {
    height: WINDOW.width * 0.22,
    width: WINDOW.width * 0.22,
    borderRadius: WINDOW.width * 0.11,
    borderWidth: 1,
    borderColor: colorLiteral.GREY,

  },
  addImage: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "70%",
    left: "13%",
    height: WINDOW.width * 0.067,
    width: WINDOW.width * 0.067,
    borderRadius: WINDOW.width * 0.0335,
    elevation: 2,
    backgroundColor: colorLiteral.BUTTON
  },
  email: {
    flex: 0.9,
    fontSize: WINDOW.width * 0.038
  },
  textMark: {
    fontSize: WINDOW.width * 0.04,
    color: colorLiteral.BUTTON
  },
  mark: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginButton: {
    alignItems: "center",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    backgroundColor: colorLiteral.BUTTON,
    width: WINDOW.width / 1.9,
    height: (Platform.OS === 'ios') ? WINDOW.width * 0.1 : WINDOW.width * 0.12,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colorLiteral.BUTTON
  },
  loginText: {
    color: colorLiteral.WHITE,
    fontWeight: "700",
    fontSize: WINDOW.width * 0.04
  },
  socialButtonText: {
    color: colorLiteral.WHITE,
    fontWeight: "700",
    fontSize: WINDOW.width * 0.04
  },
  googleButton: {
    alignItems: "center",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    marginHorizontal: 10,
    width: WINDOW.width / 2.5,
    height: WINDOW.width * 0.1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  facebookButton: {
    alignItems: "center",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    marginHorizontal: 10,
    width: WINDOW.width / 2.5,
    height: WINDOW.width * 0.1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  addImageText: {
    color: colorLiteral.WHITE,
    fontSize: WINDOW.width * 0.037,
    fontWeight: "700"
  },
  bottomView: {
    flexDirection: "row",
    alignItems: "center"
  },
  bottomText: {
    fontSize: WINDOW.width * 0.036,
    textAlign: "center",
    marginVertical: 20
  },
  logHere: {
    fontSize: WINDOW.width * 0.036,
    textAlign: "center",
    color: colorLiteral.BUTTON
  },
  andText: {
    fontSize: WINDOW.width * 0.036,
    textAlign: "center"
  },
  modalText: {
    fontSize: WINDOW.width * 0.036,
    textAlign: "center",

  },
  nextView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 0
  },
  nextText: {
    fontSize: WINDOW.width * 0.036,
    textAlign: "center"
  },
  orsignupText: {
    fontSize: WINDOW.width * 0.036,
    fontWeight: "600",
    color: colorLiteral.GREY,
  },
  privatePolicy: {
    fontSize: WINDOW.width * 0.036,
    textAlign: "center",
  },
  camModal: {
    backgroundColor: 'white',
    height: 200,
    borderRadius: 40,
    width: WINDOW.width * 0.92,
    position: "absolute",
    bottom: 250,
    left: 18,
    alignItems: 'center'
  },
  camMainModal: {
    flex: 1,
    borderRadius: 30,
    height: 200,
    width: WINDOW.width * 0.9
  },
  selectPicView: {
    flex: 0.20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: "#a2a2a2",
    borderBottomWidth: 1
  },
  selectPicText: {
    color: "grey",
    fontSize: 15,
    textAlign: 'center',
    width: WINDOW.width * 0.4
  },
  takePhoto: {
    flex: 0.26,
    justifyContent: 'center',
    borderBottomColor: "#a2a2a2",
    borderBottomWidth: 1
  },
  instructionText: {
    color: "blue",
    fontSize: 19,
    textAlign: 'center'
  },
  libView: {
    flex: 0.26,
    justifyContent: 'center',
    borderBottomColor: "#a2a2a2",
    borderBottomWidth: 1
  },
  cancelView: {
    flex: 0.25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    borderBottomColor: "grey",
    borderBottomWidth: 1
  },
})