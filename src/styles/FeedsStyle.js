import {
    StyleSheet,
    Dimensions
} from "react-native";
import { colorLiteral } from "../constants/Color";
const WINDOW = Dimensions.get("window");

export const styles = StyleSheet.create({

    feedContainer: {
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: colorLiteral.WHITE,
        borderBottomWidth: 1,
        borderColor: colorLiteral.GREY
    },
    feedMainView: {
        height: WINDOW.height / 7 * 5.5,

    },
    imageIcon: {
        height: WINDOW.width * 0.05,
        width: WINDOW.width * 0.05,
        marginHorizontal : 10
    },
    header: {
        flex: 0.13,
        flexDirection: "row",

    },
    albumart: {
        flex: 0.42,
        backgroundColor: colorLiteral.MEDIUM_GREY
    },
    detail: {
        flex: 0.22,
        borderColor: colorLiteral.GREY,
        borderBottomWidth: 1,
        padding: 15
    },
    stats: {
        flex: 0.17,

    },
    profilepicture: {
        flex: 0.2,

        alignItems: "center",
        justifyContent: "center"
    },
    profileName: {
        flex: 0.6,

        flexDirection: "column",
        justifyContent: 'center'
    },
    fav: {
        flex: 0.2,

    },
    userImage: {
        height: WINDOW.width / 6.5,
        width: WINDOW.width / 6.5,
        borderRadius: WINDOW.width / 13
    },
    username: {
        fontSize: 16,
        fontWeight: "700",
        color: colorLiteral.GREY
    },
    date: {
        color: "grey"
    },
    albumImage: {
        height: WINDOW.height / 3.2,
        width: WINDOW.width
    },
    titleView: {
        flex: 0.3
    },
    descriptionView: {
        flex: 0.5
    },
    alternativeView: {
        flex: 0.2
    },
    title: {
        fontWeight: "600",
        fontSize: 18,
        color: colorLiteral.GREY
    },
    stats1: {
        flex: 0.45,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: colorLiteral.GREY,

        justifyContent: "space-between",
        paddingHorizontal: 15,
        alignItems: "center"
    },
    stats2: {
        flex: 0.55,
        alignItems: "center",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: colorLiteral.GREY,
        paddingHorizontal: 15,

    },
    stats21: {
        flex: 0.5,
        flexDirection: "row",
       
    },
    stats22: {
        flex: 0.5,
        alignItems: "center",
        justifyContent: "center"
    },
    nofeedcontainer:{flex:1, padding:WINDOW.width/5, alignItems:'center', justifyContent:"center"},
    nofeedtext : {textAlign:"center", fontWeight:"600", color:colorLiteral.GREY},
    selectedButton :{
        borderColor:colorLiteral.BUTTON,
        backgroundColor:colorLiteral.BUTTON,
        borderWidth:1,
        borderRadius:2,
        width:WINDOW.width/3,
        height:35,
        alignItems:"center",
        justifyContent:"center",
        margin:10,
        shadowOpacity:0.5,
        shadowOffset:{
            width:1, height:1
        }
    },
    selectedButtonText:{
        fontWeight : "600",
        fontSize:14,
        color:colorLiteral.WHITE   
    }
});