import {
    StyleSheet,
    Dimensions
} from "react-native";
import { colorLiteral } from "../constants/Color";
const WINDOW = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
      
      },
      storiesContainer: {
       shadowOffset:{width:1,height:1},
       shadowOpacity:0.4,
    backgroundColor : "white",
    zIndex:2,
       alignItems:"center",
       justifyContent:"center",
       borderBottomWidth:1,
       borderColor:"grey"
      },
      storyStyle :{
        height:WINDOW.height/7,
        width:WINDOW.height/7,
    
        alignItems:"center",
        justifyContent:"center",
  
      },
      userImageView : {
          alignItems:"center",
          justifyContent:"center",
      
          height:WINDOW.width/5.4,
          width:WINDOW.width/5.4,
          borderRadius : WINDOW.width/10.8,
          borderWidth:2,
          borderColor : colorLiteral.BLUE
      },
      nameView : {
        height:WINDOW.width/15,
        justifyContent:"center"
      },
      userImage : {
        height:WINDOW.width/6.1,
        width:WINDOW.width/6.1,
        borderRadius : WINDOW.width/12.2
      },
      name  :{
          alignSelf : "center"
      },
      addImage : {
        alignItems:"center",
        justifyContent : "center",
        position : "absolute",
        top : "70%",
        left : "73%",
        height : 20,
        width : 20,
        borderRadius : 10,
        backgroundColor : colorLiteral.BLUE
      },
    });