import {
    StyleSheet,
    Dimensions,
    Platform
} from "react-native";
import { colorLiteral } from "../constants/Color";
const WINDOW = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    },
    pageIntro:{
        flex:0.2,
        
        alignItems:"center",
        justifyContent:"center",
        paddingHorizontal:WINDOW.width/6,
        
    },
    artistList:{
        flex:0.8,
       
    },
    h1 :{
        color:colorLiteral.DARK_GREY,
        fontSize:WINDOW.height/35,
        margin:10,
        fontWeight:"700"
    },
    h2 : {
        color:colorLiteral.GREY,
        textAlign:"center"
    },
    itemContainer:{
        flexDirection:"row",
        height:WINDOW.height/10,
       
        borderBottomWidth:1,
        borderColor:colorLiteral.LIGHTGREY
    },
    headerContainer:{
        flexDirection:"row",
        height:WINDOW.height/10,
        borderBottomWidth:1,
        alignItems:"center",
        justifyContent:"space-around",
        borderColor:colorLiteral.LIGHTGREY
    },
    imageContainer : {
        flex:0.2,
       
        alignItems:"center",
        justifyContent:"center",
    },
    artistContainer:{
        flex:0.4,
        paddingLeft:10,
        justifyContent:"center",
    },
    totalArtistContainer:{
        flex:0.6,
       paddingLeft:20,
        justifyContent:"center",
    },
    buttonContainer :{
        flex:0.4,
        alignItems:"center",
        justifyContent:"center",
      
    },
    artistImage : {
        height : WINDOW.height/15,
        width:WINDOW.height/15,
        borderRadius : WINDOW.height/30,
        borderWidth:1,
        borderColor:colorLiteral.BUTTON
    },
    name : {
        color:colorLiteral.DARK_GREY,
        fontSize:16,
        fontWeight : "700",
        marginVertical:5
    },
    genre:{
        color:colorLiteral.GREY
    },
    button : {
        borderColor:colorLiteral.BUTTON,
        borderWidth:1,
        borderRadius:3,
        width:WINDOW.width/3.2,
        height:25,
        alignItems:"center",
        justifyContent:"center",
    },
    selectedButton :{
        borderColor:colorLiteral.BUTTON,
        backgroundColor:colorLiteral.BUTTON,
        borderWidth:1,
        borderRadius:3,
        width:WINDOW.width/3.2,
        height:25,
        alignItems:"center",
        justifyContent:"center",
    },
    buttonText:{
        fontWeight : "600",
        fontSize:10,
        color:colorLiteral.BUTTON
    },
    selectedButtonText:{
        fontWeight : "600",
        fontSize:10,
        color:colorLiteral.WHITE   
    }
})