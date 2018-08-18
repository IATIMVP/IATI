import {
    StyleSheet,
    Dimensions,
    Platform
} from "react-native";
import { colorLiteral } from "../constants/Color";
const WINDOW = Dimensions.get("window");

export const styles = StyleSheet.create({
    main: {
        flex: 1,
       
    },
    dashboardText: {
        fontSize: WINDOW.width * 0.05 ,
        fontWeight: 'bold'
    },
    container: {
       
        flex:1,
        backgroundColor:colorLiteral.WHITE
      },
      storiesContainer: {
        height: WINDOW.height / 7+20,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        backgroundColor: colorLiteral.WHITE,
        zIndex: 2,
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderColor: colorLiteral.MEDIUM_GREY
      },
      storyStyle: {
        marginVertical:10,
        height: WINDOW.height / 7,
        width: WINDOW.height / 7,
    
        alignItems: "center",
        justifyContent: "center",
    
      },
      userImageView: {
        alignItems: "center",
        justifyContent: "center",
    
        height: WINDOW.width / 5.4,
        width: WINDOW.width / 5.4,
        borderRadius: WINDOW.width / 10.8,
        borderWidth: 2,
        borderColor: colorLiteral.BLUE
      },
      nameView: {
        height: WINDOW.width / 15,
        justifyContent: "center"
      },
      userImage: {
        height: WINDOW.width / 6.1,
        width: WINDOW.width / 6.1,
        borderRadius: WINDOW.width / 12.2
      },
      name: {
        alignSelf: "center"
      },
      addImage: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "70%",
        left: "73%",
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: colorLiteral.BLUE
      },
      nofeedtext : {textAlign:"center", fontWeight:"600", color:colorLiteral.GREY},
})