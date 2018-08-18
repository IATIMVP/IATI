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
  email: {
    flex: 0.9,
    fontSize: WINDOW.width * 0.035,
    fontWeight: '600',
    borderBottomColor: "#d2d2d2",
    borderBottomWidth: 2,
    marginLeft:'6%',
  },
  valueSub: {
    flex: 1,
    height:WINDOW.width*0.1,
    fontSize: WINDOW.width * 0.035,
    fontWeight: '600',
    borderBottomColor: "#d2d2d2",
    borderBottomWidth: 2,
    marginLeft:'9%',
    marginTop:'1%'
  },
  nameInput: {
    flex: 0.12,
    flexDirection: 'row'
  },
  loginButton: {
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    width: WINDOW.width / 1.9,
    height: WINDOW.width * 0.115,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colorLiteral.BUTTON
  },
  saveButton:{
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    width: WINDOW.width / 2.2,
    height: WINDOW.width * 0.105,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colorLiteral.BUTTON
  },
delButton:{
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    width: WINDOW.width / 2.2,
    height: WINDOW.width * 0.105,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginLeft:'3%'
    // backgroundColor: colorLiteral.BUTTON
  },

  addImageText: {
    color: colorLiteral.WHITE,
    fontSize: WINDOW.width * 0.036,
    fontWeight: "700"
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
  loginText: {
    fontWeight: "700",
    fontSize: (Platform.OS === 'ios') ? WINDOW.width * 0.04 : WINDOW.width * 0.04,
    color: colorLiteral.WHITE
  },
  delText: {
    fontWeight: "700",
    fontSize: (Platform.OS === 'ios') ? WINDOW.width * 0.04 : WINDOW.width * 0.04,
    color: 'black'
  },
  listStyle: {
    flex: 0.1,
    padding: '2%',
    flexDirection: 'row',
    paddingTop: '5%'
  },
  type: {
    fontSize: WINDOW.width * 0.038,
    fontWeight: '600',
    color: colorLiteral.GREY,
    paddingTop: '2%',
    paddingHorizontal: '2%'
  },
  type1: {
    fontSize: WINDOW.width * 0.03,
    color: colorLiteral.GREY,
    paddingHorizontal: '2%'
  },
  selectProfileView: {
    flex: 0.1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  selectProfileText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500'
  },
  pickImage: {
    flex: 0.75
  },
  logo : { 
    height: WINDOW.width *0.22, 
    width: WINDOW.width *0.22,
    borderRadius :WINDOW.width *0.11,
    borderWidth : 1,
    borderColor : colorLiteral.GREY
  },
  pickerView: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomBar: {
    flex: 0.7,
    flexDirection: 'row'
  },
  infoStyle: {
    flex: 0.5,
    paddingTop: '3%'
  },
  skipText: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center'
  },
  infoHeader: {
    flex: 0.1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  infoText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500'
  },
  fillnameView: {
    flex: 0.75,
    backgroundColor: 'white'
  },
  selectGenreBar: {
    flex: 0.12
  },
  selectGenreText: {
    flex: 0.3,
    fontSize: 16,
    marginTop:'1%',
  },
  genreSet: {
    flex: 0.6,
    fontSize: 14,
    marginTop: '1%',
    marginLeft: '3%',
    color: "grey"
  },
  genreSetView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: '4%',
    paddingHorizontal:'3%'
  },
  iconSet: {
    flex: 0.05,paddingBottom:'2%',
    marginLeft: '3%'
  },
  continueView: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subListStyle: {
    flex: 0.8,
    marginLeft: '3%'
  },
  selectSubStyle: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: '2%'
  },
  newSubHeader: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headingText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500'
  },
  addSubMainView: {
    flex: 0.75
  },
  addSubMainText: {
    flex: 0.13
  },
  mainTextStyle: {
    fontSize: 14,
    color: "grey",
    textAlign: 'center',
    fontWeight: '500'
  },
  mainTextStyle2: {
    fontSize: 11,
    color: "grey",
    textAlign: 'center',
    fontWeight: '500',
    paddingTop: '1%'
  },
  addNewView: {
    flex: 0.15
  },
  addNew2View: {
    flex: 1,
    flexDirection: 'row',
    marginTop: '4%'
  },
  setLevel: {
    flex: 0.75
  },
  setLevelView: {
    flex: 0.6,
    fontSize: 17,
    marginBottom: '1%',
    marginLeft: '5%',
    fontWeight: '500',
    color: "grey"
  },
  addNewText: {
    flex: 0.2,
    fontSize: 16,
    fontWeight: '500'
  },
  addIcon: {
    flex: 0.05,
    marginLeft: '3%'
  },
  submitView: {
    flex: 0.1,
    flexDirection: 'row',
    paddingTop: '6%'
  },
  skipthisText: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center'
  },
  chargeHeaderText: {
    flex: 0.13,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  chargeText: {
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '500'
  },
  chargeButtonView: {
    flex: 0.2,
    flexDirection: 'row',
    paddingTop: '6%'
  },
  onAddNew: {
    flex: 0.6,
    paddingTop: '3%'
  },
  setPostValue: {
    flex: 0.23,
    fontSize: 15,
    fontWeight: '500',
    color: "black",
    marginTop: '1%'
  },
  questionText: {
    fontSize: 13,
    marginBottom: '1%',
    marginLeft: '5%',
    fontWeight: '500',
    color: "grey"
  },
  questText: {
    flex: 0.6
  },
  quesView: {
    flex: 0.75
  },
  midView: {
    flex: 0.14
  },
  camModal:{ 
    backgroundColor: 'white', 
    height: 200,
     borderRadius: 40, 
     width: WINDOW.width * 0.92, 
     position: "absolute", 
     bottom: 250, 
     left: 18, 
     alignItems: 'center' 
    },
  camMainModal:{ 
    flex: 1, 
    borderRadius: 30, 
    height: 200, 
    width: WINDOW.width * 0.9
   },
  selectPicView:{ 
    flex: 0.20, 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    justifyContent: 'center',
    alignItems:'center', 
    borderBottomColor: "grey", 
    borderBottomWidth: 1 
  },
  selectPicText:{ 
    color: "grey", 
    fontSize: 15, 
    textAlign: 'center',
    width:WINDOW.width *0.4
  },
  takePhoto:{ 
    flex: 0.26, 
    justifyContent: 'center', 
    borderBottomColor: "grey", 
    borderBottomWidth: 1 
  },
  instructionText:{ 
    color: "blue", 
    fontSize: 19, 
    textAlign: 'center' 
  },
libView:{ 
  flex: 0.26, 
  justifyContent: 'center', 
  borderBottomColor: "grey", 
  borderBottomWidth: 1 
},
cancelView:{ 
  flex: 0.25, 
  borderBottomLeftRadius: 30, 
  borderBottomRightRadius: 30, 
  justifyContent: 'center', 
  borderBottomColor: "grey", 
  borderBottomWidth: 1 
},
})