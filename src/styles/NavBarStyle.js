import {
  StyleSheet,
  Dimensions,
} from "react-native";
import { colorLiteral } from "../constants/Color";
const WINDOW = Dimensions.get("window");
import { ifIphoneX } from 'react-native-iphone-x-helper'

export const styles = StyleSheet.create({
  mainView: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: colorLiteral.GREY,
    alignItems:"center",
    backgroundColor:"red"
  },
  leftButton: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '4%',
    ...ifIphoneX({
      paddingTop: "7%"
  }, {
      paddingTop: "0%"
  }),
 
  },
  rightButton:{
     flex: 0.2,
     justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '4%',
    ...ifIphoneX({
      paddingTop: "7%"
  }, {
      paddingTop: "0%"
  }),
  },
  title: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '4%',
    ...ifIphoneX({
      paddingTop: "7%"
  }, {
      paddingTop: "0%"
  }),
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
  
  },
pressButton:{
  width:35,
  height:35,
  justifyContent:'center',
  alignItems:'center'
},
})