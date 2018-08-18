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
  loginButton: {
    alignItems: "center",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    backgroundColor: colorLiteral.BUTTON,
    width: WINDOW.width / 1.9,
    height: WINDOW.width * 0.115,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center"
  },
  loginText: {
    fontWeight: "700",
    fontSize: (Platform.OS === 'ios') ? WINDOW.width * 0.04 : WINDOW.width * 0.04,
    color: colorLiteral.WHITE
  },
  addpostView: {
    flex: 0.2,
    flexDirection: 'row',
  },
  addPic: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: "3%",
  },
  addPicNew: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: "3%",
  },
  addpicText: {
    fontSize: WINDOW.width * 0.026,
    color: colorLiteral.GREY
  },
  iamgeProfile: {

  },

  postTitleHead: {
    color: 'grey',
    marginLeft: WINDOW.width * 0.037,
    fontSize: WINDOW.width * 0.033,
    marginTop: '2%'
  },
  postTitle: {
    flex:1,
    color: 'black',
    fontSize: WINDOW.width * 0.038,
  },
  titleView: {
    flex: 0.1,
    marginHorizontal: '3%'
  },
  captionView: {
    flex: 0.2,
    marginHorizontal: '3%'
    
  },
  subView: {
    flex: 0.13,
  },
  genreSelect: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  genreSelectText: {
    flex: 0.9,
    fontSize: WINDOW.width * 0.039,
    fontWeight: '500'
  },
  buttonView: {
    flex: 0.25,
    alignItems: 'center',
    paddingTop: WINDOW.width * 0.055
  },
  listStyle: {
    flex: 0.1,
    padding: '2%',
    flexDirection: 'row'
  },
  type: {
    fontSize: WINDOW.width * 0.038,
    color: colorLiteral.GREY,
    padding: '2%'
  },
  newPostContainer: {
    height: WINDOW.width * 0.37,
    width: WINDOW.width * 0.85,
    backgroundColor: 'white',
    borderRadius: 20,
    position: 'absolute',
    top: WINDOW.height * 0.5 - WINDOW.width * 0.17,
    left: WINDOW.width * 0.075
  },
  secondContainer: {
    flex: 0.4,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center'
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    color: '#858585'
  },
  modalHeaderText2: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    color: '#858585'
  },
  embedVideoView: {
    flex: 0.27,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#545456",
    marginHorizontal: "5%",
    justifyContent: 'center',
    marginTop:'1%'
  },
  embedText: {
    height: 40,
    marginLeft: "5%"
  },
  modalButtonView: {
    flex: 0.28,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  cancelText: {
    fontSize: 18,
    color: '#5477D7',
    fontWeight: '500'
  },
  imageProfile: {
    height: WINDOW.width * 0.23,
    width: WINDOW.width * 0.23
  },
  videoStyle: {
    height: WINDOW.width * 0.23,
    width: WINDOW.width * 0.23,
  },
  flatListRender: {
    flex: 0.5,
    paddingTop: '3%',
    paddingLeft: '2%'
  },
  publishView: {
    flex: 0.6,
    marginLeft: '5%'
  },
  postView: {
    flex: 0.87,
   
  },

  topTextView: {
    flex: 0.1,
    justifyContent: 'flex-end'
  },
  topText: {
    fontSize: 14
  },
  setPrivacyBar: {
    flex: 0.12,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  setPrivacyText: {
    flex: 0.95,
    fontSize: 14,
    marginBottom: '1%'
  },
  questionTextView: {
    flex: 0.2,
    justifyContent: 'center'
  },
  questionText: {
    fontSize: 12
  },
  renderTickView: {
    flex: 0.3
  },
  firstTickView: {
    flex: 0.5,
    flexDirection: 'row'
  },
  checkboxView: {
    flex: 0.15,
    justifyContent: 'center'
  },
  YesTextView: {
    flex: 0.85
  },
  YesText: {
    fontSize: 18,
    fontWeight: '600',
    paddingTop: '3%'
  },
  subTotalView: {
    flexDirection: "row"
  },
  subTotaltext: {
    fontSize: 13
  },
  dollarText: {
    color: colorLiteral.BUTTON
  },
  importantView: {
    flex: 0.2,
    justifyContent: 'flex-end'
  },
  impText: {
    fontSize: 11,
    fontWeight: '500'
  },
  otherText: {
    fontSize: 11
  },
  publishButtonView: {
    flex: 0.25,
    alignItems: 'center',
    paddingTop: '10%'
  },
  logo: {
    height: WINDOW.width * 0.1,
    width: WINDOW.width * 0.1,
    borderRadius: WINDOW.width * 0.05,
    borderWidth: 1,
    borderColor: colorLiteral.GREY,
    marginLeft:'4%'
  },
})