import {
    StyleSheet,
    Dimensions,
} from "react-native";
import { colorLiteral } from "../constants/Color";
const WINDOW = Dimensions.get("window");
import { ifIphoneX } from 'react-native-iphone-x-helper'

export const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flex: 0.1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-around',
    },
    body: {
        flex: 0.9,
         borderTopWidth:2,
        borderColor:'#d2d2d2',
        backgroundColor: 'transparent',
    },
    imageView: {
        flex: 0.33,
        backgroundColor: 'transparent',
        paddingLeft: '2%',
        ...ifIphoneX({
            paddingTop: "7%"
        }, {
            paddingTop: "0%"
        }),
    },
    searchImage: {
        height: 23,
        width: 23,
      
    },
    accountText: {
        flex: 0.33,
        ...ifIphoneX({
            marginTop: "7%"
        }, {
            marginTop: "0%"
        }),
        textAlign: 'center',
        fontSize: WINDOW.width * 0.045,
        fontWeight: "500"
    },
    doneText: {
        flex: 0.33,
        textAlign: 'right',
        fontSize: WINDOW.width * 0.04,
        paddingRight: '2%',
        fontWeight: "500",
    },
    pageView: {
        height: WINDOW.height * 1
    },
    viewStyleTop: {
        flex: 0.14,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems:'center',
        paddingLeft:'1%',
    },
    viewStyle: {
        flex: 0.085,
        alignItems:"center",
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingLeft:'2%',
    },
    viewStyle2: {
        flex: 0.12,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingLeft:'1%',
        alignItems: 'center',
    },
    viewStyle1: {
        // backgroundColor:"red",
        flex: 0.1,
        alignItems:"center",
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingLeft:'3%'
    },
    profilepicStyle: {
        height: WINDOW.width * 0.12,
        width: WINDOW.width * 0.12,
        borderRadius: WINDOW.width * 0.06,
        borderColor: "black",
        backgroundColor:colorLiteral.VERYLIGHT_GREY
    },
    textStyleTop: {
        flex: 0.85,
        marginTop:"2%"
    },
    textStyle: {
        flex: 0.8,
    },
    textNew: {
        flex: 0.9,
        fontSize: WINDOW.width * 0.04
    },
    username: {
        flex: 0.8,
        fontSize: WINDOW.width * 0.04,
        marginTop: '2%'
    },
    username2: {
        flex: 0.8,
        fontSize: WINDOW.width * 0.03
    },
logoutText:{ 
    color: 'hotpink', 
    fontWeight: '500', 
    fontSize: WINDOW.width * 0.046, 
    marginLeft: '16%' 
},
})