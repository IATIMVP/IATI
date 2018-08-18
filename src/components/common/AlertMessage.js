// Custom component For rendering Alert message on Top
// props : 
// error  : boolean | true=> "if rendering red Alert else false which will render green alert"
// value : String | Text To be shown on Alert
// serverMessage : Boolean | If the message to be shown is coming from server // Handling multilingual support


import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
    Easing,
    TouchableOpacity
} from "react-native";
import { colorLiteral } from "../../constants/Color";
import ErrorIcon from "react-native-vector-icons/MaterialIcons";
import CustomText from "./CustomText";
const WINDOW = Dimensions.get("window");

export default class AlertMessage extends Component {
    constructor() {
        super();
        this.animatedValue = new Animated.Value(0)
    }
    componentDidMount() {
        this.animate()
    }
    animate() {
        this.animatedValue.setValue(0)
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 700,
                easing: Easing.linear
            }
        ).start()
    }
    render() {
        const opacity = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0.5, 0.92]
        })
        return (
            <Animated.View style={[styles.container, this.props.error ? { opacity, backgroundColor: colorLiteral.ERROR } : { opacity, backgroundColor: colorLiteral.SUCCESS }]}>
                {this.props.error ? <ErrorIcon
                    name="error-outline"
                    size={WINDOW.height / 25}
                    color={colorLiteral.BUTTON}
                    style={{ marginHorizontal: 5 }}
                /> : null}
                <CustomText
                    medium
                    serverText={this.props.serverMessage}
                    value={this.props.value}
                    style={styles.text}
                />
            </Animated.View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        position: "absolute",
        top: 0,
        alignItems: "center",
        justifyContent: "center",
        height: WINDOW.height / 9,
        width: WINDOW.width,
        padding: 15
    },
    text: {
        color: "white"
    }
})

