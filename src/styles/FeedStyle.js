import {
    StyleSheet,
    Dimensions
} from "react-native";
import { colorLiteral } from "../constants/Color";
const WINDOW = Dimensions.get("window");

export const styles = StyleSheet.create({
   
      feedContainer: {
       
    backgroundColor : "white",
       borderBottomWidth:1,
       borderColor:"grey"
      },
      feedMainView:{
             height:WINDOW.height/7*5.5,
           
      },
      header : {
          flex:0.13, 
          flexDirection:"row",
        
      },
      albumart : {
          flex:0.42,
          backgroundColor:"powderblue"
      },
      detail : {
        flex:0.22,
        borderColor:"grey",
        borderBottomWidth:1,
        padding:15
      },
      stats:{
        flex:0.17,
        
      },
      profilepicture :{
          flex:0.2,
          
          alignItems:"center",
          justifyContent:"center"
      },
      profileName:{
        flex:0.6,
     
        flexDirection:"column",
        justifyContent:'center'
      },
      fav:{
        flex:0.2,
       
      },
      userImage : {
        height:WINDOW.width/6.5,
        width:WINDOW.width/6.5,
        borderRadius : WINDOW.width/13
      },
      username :{
          fontSize:16,
          fontWeight:"700",
          color : colorLiteral.GREY
      },
      date :{
        color : "grey"
      },
      albumImage : {
          height : WINDOW.height/3.2,
          width:WINDOW.width
      }, 
      titleView :{
          flex:0.3
      },
      descriptionView :{
          flex:0.5
      },
      alternativeView:{
          flex:0.2
      },
      title:{
          fontWeight:"600",
          fontSize : 18,
         color:colorLiteral.GREY
      },
      stats1:{
          flex:0.45,
          flexDirection:"row",
          borderBottomWidth:1,
          borderColor:"grey",
         
          justifyContent:"space-between",
          paddingHorizontal:15,
          alignItems:"center"
      },
      stats2:{
        flex:0.55,
        alignItems:"center",
        flexDirection:"row",
        borderBottomWidth:1,
        borderColor:"grey",
        paddingHorizontal:15,
      
    },
    stats21:{
        flex:0.6,
        flexDirection:"row",
        justifyContent:"space-around"
    },
    stats22:{
        flex:0.4,
        alignItems:"center",
        justifyContent:"center"
    }
    });