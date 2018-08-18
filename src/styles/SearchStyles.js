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
})