import {
    StyleSheet,
    Dimensions,
} from "react-native";
const WINDOW = Dimensions.get("window");
import { colorLiteral } from "./../constants/Color";
export const styles = StyleSheet.create({
    main: {
        flex: 1,
        
    },
    albumartView : {
        flex:0.6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    playerView:{
        flex:0.4
    },
    albumart:{
        height:WINDOW.width-20,
        width:WINDOW.width-20,
        margin:5
    },
    trackInfoView:{
        flex:0.3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    seekBarView:{
        flex:0.2,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    timeView:{
        width:WINDOW.width,
        flex:0.4,
        flexDirection:"row",
        justifyContent:"space-between"
    },
    time:{
        fontWeight:"600",
        marginHorizontal:10,         
        color:colorLiteral.GREY
    },
    controlsView:{
        flex:0.4,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around"
    },
    lastView:{
        flex:0.1,
        justifyContent:"center",
        alignItems: 'center'
    },
    trackName : {
        fontSize : WINDOW.height/27,
        fontWeight:"600",
        color:colorLiteral.GREY
    },
    artistName:{
        fontSize : WINDOW.height/50,
        color:colorLiteral.BUTTON,
        fontWeight:"700"
    },
    repeatIconStyle:{
        
    },
   
})