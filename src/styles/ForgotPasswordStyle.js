import {
    StyleSheet,
    Dimensions,
    Platform
} from "react-native";
import { colorLiteral } from "../constants/Color";
const WINDOW = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        height: (Platform.OS === 'ios') ? WINDOW.height * 0.95 : WINDOW.height * 0.94,
        backgroundColor: colorLiteral.WHITE,
    },
    logoContainer: {
        flex: 0.25,
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        height: WINDOW.width * 0.21,
        width: WINDOW.width * 0.22
    },
    emailInput: {
        flex: 0.2,
        borderBottomColor: colorLiteral.BUTTON,
        borderBottomWidth: 2,
        flexDirection: 'row'
    },
    email: {
        color: colorLiteral.GREY,
        flex: 0.9
    },
    inputContainer: {
        flex: 0.4,
        paddingHorizontal: WINDOW.width / 8,
    },
    buttonInput: {
        flex: 0.3,
        alignItems: "center",
        justifyContent: "center",
    },
    loginButton: {
        alignItems: "center",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        backgroundColor: colorLiteral.BUTTON,
        width: WINDOW.width / 1.9,
        height: WINDOW.width * 0.115,
        borderRadius: 21,
        alignItems: "center",
        justifyContent: "center"
    },
    loginText: {
        color: colorLiteral.WHITE,
        fontWeight: "700",
        fontSize: WINDOW.width* 0.04
      },
})

