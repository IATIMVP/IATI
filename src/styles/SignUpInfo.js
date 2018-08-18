import {
    StyleSheet,
    Dimensions,
    Platform
} from "react-native";
import { colorLiteral } from "../constants/Color";
const WINDOW = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        height: (Platform.OS === 'ios') ? WINDOW.height * 0.95 : WINDOW.height * 0.945,
        backgroundColor: "#ffffff"
    },
    mainContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colorLiteral.BGCOLOR
    },
    mainView: {
        backgroundColor: colorLiteral.WHITE,
        height: WINDOW.height / 2.5,
        width: WINDOW.width / 1.4,
        borderRadius: 30
    },
    selectView: {
        flex: 0.2,
        alignItems: "center",
        justifyContent: "center",

    },
    text: {
        fontSize:  WINDOW.width *0.045,
        fontWeight: "600",
        color: colorLiteral.GREY
    },
    modalOpt: {
        flex: 0.25,
        justifyContent: "center",
        marginLeft: 20
    },
    buttonText: {
        color: colorLiteral.WHITE,
        fontWeight: "700",
        fontSize:  WINDOW.width *0.045,
    },
    onClickModal: {
        flex: 0.2,

        alignItems: "center",
        justifyContent: "center"
    },
    ageStyle: {
        color: colorLiteral.GREY,
        paddingVertical: (Platform.OS === 'ios') ? 10 : 0,
        flex: 0.9,
        marginTop: 10,
        fontSize: WINDOW.width *0.036
    },
    continueText: {
        alignItems: "center",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        backgroundColor: colorLiteral.BUTTON,
        width: WINDOW.width / 1.9, 
        height:(Platform.OS === 'ios')? WINDOW.width * 0.1:WINDOW.width * 0.12, 
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    modalText: {
        fontSize:  WINDOW.width *0.036,
        fontWeight: "500",
        color: colorLiteral.GREY
    },
    darkText: {
        fontSize:  WINDOW.width *0.05,
        fontWeight: "800",
        color: colorLiteral.GREY
    },
    okText: {
        fontSize:  WINDOW.width *0.044,
        fontWeight: "400",
        color: colorLiteral.BUTTON

    },
    logoContainer: {
        flex: 0.2,
        alignItems: "center",
        justifyContent: "center"
    },
    inputContainer: {
        flex: 0.4,
        padding: (Platform.OS === 'ios') ? WINDOW.width / 8 : 0,
        paddingHorizontal: WINDOW.width / 8.5
    },
    emailInput: {
        flex: 0.3,
        borderBottomColor: colorLiteral.BUTTON,
        borderBottomWidth: 2,
    },
    passwordInput: {
        flex: 0.3,
        flexDirection: 'row',
        borderBottomColor: colorLiteral.BUTTON,
        borderBottomWidth: 2,
    },
    buttonInput: {
        flex: 0.4,
        marginVertical: -2,
        alignItems: "center",
        justifyContent: "center"
    },
    activityIn: {
        alignItems: "center"
    },
});
