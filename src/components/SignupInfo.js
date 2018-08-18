import React, { Component } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Dimensions,
    Image,
    Modal,
    Platform,
    Alert,
    StatusBar
} from "react-native";
import { Actions } from "react-native-router-flux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'
import { connect } from "react-redux";
import { styles } from "../styles/SignUpInfo";
import { colorLiteral } from "../constants/Color";
import OfflineNotice from "./common/OfflineNotice";
import Icon from 'react-native-vector-icons/Ionicons';
import { ifIphoneX } from 'react-native-iphone-x-helper'
import { setAge, setGender } from '../actions/setUserInfo';
const WINDOW = Dimensions.get("window");
const radio_props = [
    { label: 'Male', value: 0 },
    { label: 'Female', value: 1 },
    { label: 'Prefer Not to Say', value: 2 },
    { label: 'Other', value: 3 }
];
class SignupInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: props.setInfo.userGender ? props.setInfo.userGender : "Select",
            age: props.setInfo.userAge ? props.setInfo.userAge : 0,
            modalVisible: false,
            value: "",
            ageNull: false,
            ageErr: false,
            ageInvalid: false,
            pointFilled: false
        };
    }
    componentWillMount() {

        this.setState({ data: this.props.data })
    }
    componentWillReceiveProps(nextProp) {
        if (nextProp.setInfo.userInfo) {
        }
    }
    handleSubmit() {
        if (this.state.gender === "Select") {
            Alert.alert("Please choose your gender")
        }
        else if (this.state.age === 0 || this.state.age === "") {
            this.setState({ ageNull: true })
        }
        else if (this.state.age < 13) {
            this.setState({ ageErr: true, age: 0 })
        }
        else if (this.state.age > 101 || (/\D/.test(this.state.age))) {
            this.setState({ ageInvalid: true, age: 0 })
        }
        else {
            let dataNext = {
                age: this.state.age,
                gender: this.state.gender,
                email: this.props.data.email,
                password: this.props.data.password,
                name: this.props.data.name,
                username: this.props.data.username,
                file: this.props.data.file,
                type: this.props.data.type ? this.props.data.type : '',
                token: this.props.data.token ? this.props.data.token : '',
                userId: this.props.data.userId ? this.props.data.userId : '',

            }
            Actions.selectgenre({ dataNext: dataNext })
        }
    }
    showModal() {
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    }
    ageChange(age) {
        let newText = '';
        let numbers = '0123456789';
        for (var i = 0; i < age.length; i++) {
            if (numbers.indexOf(age[i]) > -1) {
                newText = newText + age[i];
            }
        }
        if (newText.length === 0) { this.setState({ age: newText, ageNull: false }) }

        else {
            this.setState({ age: newText, ageNull: false, ageErr: false, ageInvalid: false })
            this.props.setAge(age)
        }
    }
    render() {
        return (
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps={Platform.OS === 'ios' ? 'never' : 'always'}
                contentContainerStyle={styles.container}>
                <View style={styles.container}>
                    <StatusBar
                        hidden={false}
                        backgroundColor={colorLiteral.STATUSBAR}
                        barStyle="dark-content"
                    />
                    <OfflineNotice />
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => null}
                    >

                        <View style={styles.mainContainer}>

                            <View style={styles.mainView}>
                                <View style={styles.selectView}>
                                    <Text style={styles.text}>Select Gender</Text>
                                </View>
                                <View style={{ flex: 0.6, paddingLeft: 30, justifyContent: 'center' }}>
                                    <RadioForm
                                        isSelected={true}
                                        buttonColor={colorLiteral.GREY}
                                        buttonInnerColor={colorLiteral.RED}
                                        radio_props={radio_props}
                                        initial={this.state.value}
                                        buttonSize={WINDOW.width * 0.015}
                                        labelStyle={{ fontSize: WINDOW.width * 0.04, padding: "1%" }}
                                        radioStyle={{ width: WINDOW.width / 1.6, margin: 10 }}
                                        selectedButtonColor={colorLiteral.GREY}
                                        buttonOuterSize={WINDOW.width * 0.04}
                                        onPress={(value) => {
                                            this.setState({
                                                gender: radio_props[value].label,
                                                value: value
                                            }),
                                                this.props.setGender(radio_props[value].label)
                                        }}
                                    />
                                </View>
                                <TouchableOpacity
                                    onPress={() => this.showModal()}
                                    style={styles.onClickModal}
                                >
                                    <Text style={styles.okText}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </Modal>
                    <TouchableOpacity style={{ flex: 0.1, ...ifIphoneX({ top: 40 }, { top: 20 }), left: 10 }} onPress={() => Actions.pop()}>
                        <Icon
                            name='ios-arrow-back'
                            size={30}
                        />
                    </TouchableOpacity>
                    <View style={styles.logoContainer}>

                        <Text style={styles.darkText}>Tell us more about you. </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.emailInput}>
                            <Text style={{ color: colorLiteral.GREY, fontSize: WINDOW.width * 0.036 }}>Gender</Text>
                            <TouchableOpacity
                                style={{ flex: 1, marginVertical: 10 }}
                                onPress={() => this.showModal()}
                            >
                                <Text style={styles.darkText}>{this.state.gender}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.passwordInput}>
                            <TextInput
                                underlineColorAndroid={"transparent"}
                                keyboardType={"numeric"}
                                placeholderTextColor={colorLiteral.GREY}
                                selectionColor={colorLiteral.GREY}
                                keyboardType={'numeric'}
                                style={styles.ageStyle}
                                value={this.state.age}
                                maxLength={3}
                                onChangeText={age => this.ageChange(age)}
                                placeholder={this.state.ageNull ? "Please enter your age" : this.state.ageErr ? " You must be 13 years old or above. " : this.state.ageInvalid ? "Invalid age entered" : "Age"}
                                placeholderTextColor={this.state.ageNull || this.state.ageErr || this.state.ageInvalid ? colorLiteral.BUTTON : "grey"}
                                onEndEditing={() => this.handleSubmit()}
                            />
                        </View>
                        <View style={styles.buttonInput}>
                            <TouchableOpacity
                                style={styles.continueText}
                                onPress={() => { this.handleSubmit() }}>
                                <Text style={styles.buttonText}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View >
            </KeyboardAwareScrollView >
        );
    }
}

function mapUser(state) {
    return {
        loginReducer: state.loginReducer,
        setInfo: state.setInfo
    };
}
export default connect(mapUser, { setAge, setGender })(SignupInfo);
