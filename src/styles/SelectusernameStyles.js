import {
    StyleSheet,
    Dimensions, Platform
} from "react-native";
import { colorLiteral } from "../constants/Color";
const WINDOW = Dimensions.get("window");
import { ifIphoneX } from 'react-native-iphone-x-helper'

export const styles = StyleSheet.create({

    container: {
        height: (Platform.OS === 'ios') ? WINDOW.height * 0.95 : WINDOW.height * 0.945,
        backgroundColor: "#ffffff"
    },
    darkText: {
        fontSize: WINDOW.width * 0.0459,
        fontWeight: "600",
        color: "black",
        paddingTop: '5%',
        paddingBottom: '2%'
    },
    headertext: {
        fontSize: WINDOW.width * 0.031,
        fontWeight: "500",
        color: colorLiteral.GREY,
        padding: 2
    },
    ageStyle: {
        color: colorLiteral.GREY,
        paddingVertical: (Platform.OS === 'ios') ? 10 : 0,
        flex: 0.9,
        fontSize: WINDOW.width * 0.036,
        marginLeft:'3%',
        
    },
    buttonText: {
        color: colorLiteral.WHITE,
        fontWeight: "600",
        fontSize: WINDOW.width * 0.045,
    },
    body: {
        flex: 0.78,
        backgroundColor: 'white',
        ...ifIphoneX({
            paddingHorizontal: 20
        }, {
            paddingHorizontal: 25
        }),
        
    },
    viewStyle: {
        flex: 0.5,
        width:WINDOW.width*0.85,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 6,
      
    },
    viewStyle1: {
        flex: 0.5,
        width:WINDOW.width*0.85,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 6,
        marginTop:'6%',
    },
    viewStyle3: {
        flex: 0.9,
        width:WINDOW.width*0.85,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 6,
        marginTop:'6%',
    },
    textView: {
        flex: 0.18,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    btntext: {
        flex: 0.1,
        backgroundColor: colorLiteral.BUTTON,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6
    },
    canceltext: {
        flex: 0.1,
        backgroundColor: colorLiteral.BUTTON,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        marginTop:'4%'
    }
});